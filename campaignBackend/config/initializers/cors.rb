Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'http://localhost:3001'  # Adjust the origin based on your frontend URL
  
      resource '/campaigns',
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options]
        # credentials: true  # Enable credentials if you're sending cookies or credentials
    end
  end
  