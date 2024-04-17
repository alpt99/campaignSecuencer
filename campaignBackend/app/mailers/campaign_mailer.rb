class CampaignMailer < ApplicationMailer

    def standard_email(email_content,email_subject, email_user)
        # @user = "params[:user]"
        puts email_user
        @user = email_user
        if email_content=="Discounted Products Offers"
            @content = "We have some discounted products for you. Check them out!"
        else
            @content = "We have some new products for you. Check them out!"    
        end
        @email_subject = email_subject

        mail(to: @user, 
        subject: email_subject,
        category: "from API",
        custom_variables: { "name" => "John Doe" })
    end


end
