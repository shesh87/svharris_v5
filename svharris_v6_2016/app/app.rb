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
require "./controllers/formvalidation"
require "./controllers/mailer"
enable :logger
enable :sessions

client = Mongo::Client.new([ ENV['MONGO_LOCAL'] ], :database => 'svh_website')
db = client.database



get '/' do
	erb :index
end

get '/404.html' do
	send_file 'views/partials/404.html'
end

get '/portfolio' do
	send_file 'views/partials/portfolio.html'
end

get '/projects/:id' do
	send_file 'views/partials/projecttemp.html'
end

get '/resume' do
	send_file 'views/partials/resume.html'
end

get '/blog' do
	send_file 'views/partials/blog.html'
end

get '/blog/:id' do
	send_file 'views/partials/posttemp.html'
end

get '/contact' do
	send_file 'views/partials/contact.html'
end

post '/talktome' do
	session[:data] = Customer.new
	session[:data].parseForm(params)
	
	# if session[:data].birthname(session[:data].name) === false 
	# 	session[:data].errors.push("name")
	# end
	session[:data].email
	collectError = session[:data].anyErrors

	if collectError === false
		#send to mailer
		mailer = Mailer.new
		mailer.awesome_email(params)
		redirect to('/thankyou')
	else
		session[:printError] = collectError
		redirect to('/errorpage')
	end
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