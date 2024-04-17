class CampaignsController < ApplicationController

  def index
    @campaigns = Campaign.all

    render json: @campaigns, include: [:nodes, :edges]
  end

  def show
    @campaign = Campaign.find(params[:id])
    render json: @campaign, include: [:nodes, :edges]
  end


  def create
    nodes_data = campaign_params[:nodes_attributes]
    edges_data = campaign_params[:edges_attributes]

    if nodes_data.blank? || edges_data.blank?
      render json: { error: "Nodes or edges data is missing" }, status: :unprocessable_entity
      return
    end

    @campaign = Campaign.new(title: campaign_params[:title], description: campaign_params[:description])
    

    if @campaign.save
      node_id_map = create_nodes(nodes_data)
      create_edges(edges_data, node_id_map)
      starting_node_id = node_id_map["1"]
      @campaign.update(starting_node_id: starting_node_id) if starting_node_id.present?

      render json: @campaign, status: :created, location: @campaign
    else
      render json: @campaign.errors, status: :unprocessable_entity
    end
  end

  def update
    @campaign = Campaign.find(params[:id])
    
    if campaign_params[:nodes_attributes].present? || campaign_params[:edges_attributes].present?
      @campaign.edges.destroy_all
      @campaign.starting_node_id= nil
      @campaign.nodes.destroy_all
      # @campaign.edges.destroy_all
      node_id_map = create_nodes(nodes_data)
      create_edges(edges_data, node_id_map)
      starting_node_id = node_id_map["1"]
      @campaign.update(starting_node_id: starting_node_id) if starting_node_id.present?
      render json: @campaign, status: :ok
    end

    if @campaign.update(campaign_params)
      render json: @campaign, status: :ok
    else
      render json: @campaign.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @campaign = Campaign.find(params[:id])
    @campaign.destroy
    head :no_content
  end

  def run_campaign
    @campaign = Campaign.find(params[:id])
    bfs_traversal()
    render json: @campaign, status: :ok
    # mailer = CampaignMailer.standard_email
    # mailer.deliver_now
  end


  private
    def campaign_params
      params.require(:campaign).permit(:title, :description, 
      nodes_attributes: [:node_type, :node_description, :node_id, :email_content, :email_subject, :time_interval], 
      edges_attributes: [:srcNode, :destNode])
    end

    def create_nodes(nodes_data)
      node_id_map = {}
      # @campaign.create.nodes?
    
      nodes_data.each do |node_data|
        node = case node_data[:node_type]
               when "EmailNode"
                 EmailNode.new(description: node_data[:node_description], email_content: node_data[:email_content], email_subject: node_data[:email_subject], campaign_id: @campaign.id)
                when "TimeDelayNode"
                 TimeDelayNode.new(description: node_data[:node_description], time_interval: node_data[:time_interval], campaign_id: @campaign.id)
               end
        node.campaign = @campaign
        if node.save
          puts "Node: #{node.inspect}"
          node_id_map[node_data[:node_id]] = node.id
        else
          # Handle validation errors if needed
          puts "Failed to create node: #{node.errors.full_messages.join(', ')}"
          render json: node.errors, status: :unprocessable_entity
        end
      end
    
      node_id_map
    end
    

    def create_edges(edges_data, node_id_map)
      edges_data.each do |edge_data|
        from_node_id = node_id_map[edge_data[:srcNode]]
        from = Node.find(from_node_id)
        to_node_id = node_id_map[edge_data[:destNode]]
        to = Node.find(to_node_id)
        puts "From: #{from.inspect}"
        puts "To: #{to.inspect}" 

        edge = Edge.new(from_node: from, to_node: to, campaign: @campaign)

        if edge.save
          # Edge created successfully
        else
          # Handle validation errors
          puts "Failed to create edge: #{edge.errors.full_messages.join(', ')}"
          render json: edge.errors, status: :unprocessable_entity
          return  # Exit the method if edge creation fails
        end
      end
    end

    def bfs_traversal()
      puts "current campaign: #{@campaign}"
      root = Node.find(@campaign.starting_node_id)
      return if root.nil?

      current_time_wait = 0
      queue = [root]
      visited = Set.new  

      while !queue.empty?
        node = queue.shift
        next if visited.include?(node.id)  

        visited << node.id
        puts "Visiting Node #{node.id}"
        if node.is_a?(TimeDelayNode)
          current_time_wait += node.time_interval
        else
          node.realize_action(current_time_wait)
        end

        edges = Edge.where(from_node_id: node.id)

        edges.each do |edge|
          child = Node.find(edge.to_node_id)
          next if visited.include?(child.id)  

          queue << child
        end
      end
    end
end
