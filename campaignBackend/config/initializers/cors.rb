Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins '*'  # Adjust the origin based on your frontend URL
  
      resource '*',
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options, :run_campaign]
        # credentials: true  # Enable credentials if you're sending cookies or credentials
    end
  end
  