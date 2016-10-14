require "rubygems"
require "sinatra"
require "pry"
require "sinatra/reloader" if development?
require "json"
require "logger"
require "json/ext"
enable :logger


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

