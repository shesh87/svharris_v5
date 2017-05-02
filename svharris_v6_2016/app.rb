require "rubygems"
require 'dotenv/load'
# This tells dotenv to read the .env file and set the appropriate variables
Dotenv.load
require "sinatra"
require "pry"
require "sinatra/reloader" if development?
require "json"
require "logger"
require "mongo"
require "json/ext"
require "./models/formvalidation"
require "./models/mailer"
enable :logger
enable :sessions

client = Mongo::Client.new([ "127.0.0.1:27017" ], :database => 'svh_website')
# client = Mongo::Client.new([ "127.0.0.1:4321" ], :database => 'svh_website')
db = client.database



configure do
	set :root, File.dirname(__FILE__)
	# set :root, File.expand_path("public/app")
	set :public_folder, "public/app"
end

get "/" do
	content_type :html
	File.read("public/app/index.html")
	# send_file 'public/app/index.html'
end

post '/talktome' do
	session[:data] = Customer.new
	session[:data].parseForm(params)
	
	session[:data].fullname
	session[:data].email
	collectError = session[:data].anyErrors

	if collectError === false
		#send to mailer
		mailer = Mailer.new
		mailer.awesome_email(params)
		redirect to('/thankyou')
	else
		session[:printError] = collectError
		redirect to('/error')
	end
end

post '/talktome_js', :provides => :json do
	session[:data] = Customer.new
	session[:data].parseForm(params)
	# binding.pry
	session[:data].fullname
	session[:data].email
	
	collectError = session[:data].anyErrors
	if collectError === false
		#send to mailer
		mailer = Mailer.new
		mailer.awesome_email(params)
		halt 200, {:status => 200}.to_json	
	else
		halt 400, {:status => 400, :data => collectError}.to_json
	end
end

get '/error' do
	erb :error
end

get '/thankyou' do
	erb :thankyou
end

get '/career' do
	collection = client[:resume]
	history = []
	collection.find.each { |doc| history << doc }
	history.to_json
end

get '/project' do
	collection = client[:portfolio]
	projects = []
	collection.find.each { |doc| projects << doc }
	projects.to_json
end

get '/blogentries' do 
	collection = client[:blog]
	blogentries = []
	collection.find.each { |doc| blogentries << doc }
	blogentries.to_json
end