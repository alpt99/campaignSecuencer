class CampaignMailer < ApplicationMailer

    def standard_email
        # @user = "params[:user]"
        @user = "alpt@uc.cl"
        @content = "Esto es parte del content"

        mail(to: @user, 
        subject: 'Revisa estos nuevos productos',
        category: "from API",
        custom_variables: { "name" => "John Doe" })
    end


end
