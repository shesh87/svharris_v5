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
				# binding.pry
			elsif key === "email"
				@emailaddress = value
			elsif key === "subject"
				@subject = value
			elsif key === "message"
				@message = value
			end
		}
	end

	def birthname(birthname)
		# binding.pry
		if birthname === "" || birthname === " "
			return false
		else
			fn = birthname
			if /\d/.match(fn) || /\W/.match(fn) # is a digit or is not a-z/0-9
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



