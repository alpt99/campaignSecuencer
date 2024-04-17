class TimeDelayNode < Node
    validates :time_interval, presence: true

    def realize_action
        # Enviar mail
        # waiter = WaitingJob.perform_later(self.time_interval)
        
    end
end
