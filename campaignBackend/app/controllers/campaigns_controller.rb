class CampaignsController < ApplicationController

  def index
    @campaigns = Campaign.all

    render json: @campaigns
  end

  def show
    @campaign = Campaign.find(params[:id])
    render json: @campaign
  end


  def create
    nodes_data = campaign_params[:nodes]
    edges_data = campaign_params[:edges]

    @campaign = Campaign.new(title: campaign_params[:title], description: campaign_params[:description])

    if @campaign.save
      node_id_map = create_nodes(nodes_data)
      create_edges(edges_data, node_id_map)

      render json: @campaign, status: :created, location: @campaign
    else
      render json: @campaign.errors, status: :unprocessable_entity
    end
  end

  def edit
    @campaign = Campaign.find(params[:id])
  end


  private
    def campaign_params
      params.require(:campaign).permit(:title, :description, :nodes , :edges)
    end

    def create_nodes(nodes_data)
      node_id_map = {}
    
      nodes_data.each do |node_data|
        node = case node_data[:type]
               when "EmailNode"
                 EmailNode.create(description: node_data[:description], email_content: node_data[:email_content], email_subject: node_data[:email_subject], campaign_id: @campaign.id)
               when "TimeDelayNode"
                 TimeDelayNode.create(description: node_data[:description], time_interval: node_data[:time_interval], campaign_id: @campaign.id)
               end
    
        if node&.valid?
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
        Edge.create(from_node_id: node_id_map[edge_data[:srcNode]], to_node_id: node_id_map[edge_data[:destNode]])
      end
    end
end
