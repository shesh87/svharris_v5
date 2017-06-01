require "rubygems"
require "dotenv/load"
Dotenv.load
require "sinatra"
require "pry"
require "sinatra/reloader" if development?
require "json"
require "logger"
require "mongo"
require "json/ext"
require "./app/models/formvalidation"
require "./app/models/mailer"
enable :logger
enable :sessions


# class RServer < Sinatra::Base
	
	
	client = Mongo::Client.new([ ENV['MONGO_SERVER'] ], :database => 'svh_website')
	# client = Mongo::Client.new([ ENV['MONGO_LOCAL'] ], :database => 'svh_website')

	configure do
		set :public_folder, "public"
		set :root, File.expand_path('../svharris_v6_2016/public', File.dirname(__FILE__))
    end

	get "/" do
		content_type :html
		File.read("public/index.html")
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
		binding.pry
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

	error 400..510 do
		File.read('public/views/server-error.html')
	end

# end