
require "json"
require "json/ext"

class Customer
	attr_accessor :name, :emailaddress
	

	def initialize
		@errors = []
	end

	def anyErrors
		if @errors.empty?
			return false
		else
			return @errors
		end
	end

	def parseForm(form)
		form.each { |key, value| 
			if key === "name"
				@name = value
			elsif key === "email"
				@emailaddress = value
			end
		}
	end

	def fullname
		# binding.pry
		if @name === "" || @name === " "
			@errors << "false"
		else
			fln = @name
			if /\d/.match(fln) || /\s{2,}/.match(fln) # is a digit or is not a-z/0-9
				return false
			end
		end
	end

	def email
		if @emailaddress === "" || @emailaddress === " "
			@errors << "email"
		else
			e = @emailaddress
			if /^[\w\.\-\_\+]+@[\w-]+\.\w{2,4}$/.match(e)
			else
				@errors << "email"
			end
		end
		# binding.pry
	end

end



