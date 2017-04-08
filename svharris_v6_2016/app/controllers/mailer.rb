require "erb"
require "mail"
require "pry"
 
class Mailer
  
  def initialize()
  	options = {
            :address              => "smtp.gmail.com",
            :port                 => 587,
            :user_name            => ENV['GMAIL_USER'],
            :password             => ENV['GMAIL_PASSWORD'],
            :authentication       => 'plain',
            :enable_starttls_auto => true
        }

    Mail.defaults do 
      delivery_method :smtp, options
    end
  end
  
  def awesome_email(details)
    @user = details[:name]
    @email = details[:email]
    subject = details[:subject]
    @content = details[:message]
    
    # Not doing this will mean your template wont use your instance level variables
    b = binding
    
    mail = Mail.new
    mail.to = ENV['GMAIL_USER']
    mail.from = "hello@svharris.com"
    mail.subject = subject
    mail.body = ERB.new(File.read("./views/emailer.html.erb")).result(b)
    
    mail.deliver!
  end

end
 