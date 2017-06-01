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
    @sender = details[:email]
    @to = ENV['GMAIL_USER']
    
    # Not doing this will mean your template wont use your instance level variables
    b = binding
    # pry
    mail = Mail.new
    mail.to = @to
    mail.from = @sender
    mail.subject = subject
    mail.body = ERB.new(File.read("public/views/emailer.html.erb")).result(b)
    # pry
    mail.deliver!
  end

end
 