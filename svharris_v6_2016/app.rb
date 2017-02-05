require "rubygems"
require "sinatra"
require "pry"
require "sinatra/reloader" if development?
require "json"
require "logger"
require 'mongo'
require "json/ext"
enable :logger
enable :sessions

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'svh_website')
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