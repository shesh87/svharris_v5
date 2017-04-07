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
 
# Needed my Mail to send our email
# options = { :address              => "smtp.gmail.com",
#             :port                 => 587,
#             :user_name            => 'svonharris@gmail.com',
#             :password             => 'She19she!',
#             :authentication       => 'plain',
#             :enable_starttls_auto => true  }

# options = { :user_name            => 'hello@svharris.com',
#             :password             => 'She19she',
#             :address              => "gator3008.hostgator.com",
#             :port                 => 465,
#             :authentication       => 'plain'}
 
# mailer = Mailer.new(options)
 
# # This is a Hash that will be passed to the awesome_email method
# details = { to: 'svonharris@gmail.com', 
#             from: 'olliebeans@gmail.com',
#             subject: 'Welcome to awesome!',
#             template_path: './views/thankyou.erb' }
 
 
# mailer.awesome_email(details)