class EmailNodeController < NodeController

    def index
        email_nodes = EmailNode.all
        render json: email_nodes
    end

    def show
        email_node = EmailNode.find(params[:id])
        render json: email_node
    end

    def create
        email_node = EmailNode.new(email_node_params)
        if email_node.save
            render json: email_node, status: :created, location: email_node
        else
            render json: email_node.errors, status: :unprocessable_entity
        end
    end

    def update
        email_node = EmailNode.find(params[:id])
        if email_node.update(email_node_params)
            redirect_to email_node
        else
            render :edit, status: :unprocessable_entity
        end
    end

    def destroy
        email_node.destroy
        head :no_content
    end

    private

    def set_email_node
        @email_node = EmailNode.find(params[:id])
    end

    def email_node_params
        params.require(:email_node).permit(:email_content, :email_subject)
    end


end
