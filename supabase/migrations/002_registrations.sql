-- Create registrations table
CREATE TABLE registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  registration_number VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  section VARCHAR(50),
  department VARCHAR(255),
  year VARCHAR(20),
  phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Prevent duplicate registrations per event
  UNIQUE(event_id, registration_number),
  UNIQUE(event_id, email)
);

-- Enable Row Level Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a registration (public sign-up)
CREATE POLICY "Anyone can register for events"
  ON registrations FOR INSERT
  WITH CHECK (true);

-- Anyone can read registrations (to check if already registered)
CREATE POLICY "Anyone can view registrations"
  ON registrations FOR SELECT
  USING (true);

-- Authenticated users can manage registrations (admin)
CREATE POLICY "Authenticated users can manage registrations"
  ON registrations FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Function to update registered_count on events when a registration is added/removed
CREATE OR REPLACE FUNCTION update_event_registered_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE events SET registered_count = (
      SELECT COUNT(*) FROM registrations WHERE event_id = NEW.event_id
    ) WHERE id = NEW.event_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE events SET registered_count = (
      SELECT COUNT(*) FROM registrations WHERE event_id = OLD.event_id
    ) WHERE id = OLD.event_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER update_registered_count_on_insert
  AFTER INSERT ON registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_event_registered_count();

CREATE TRIGGER update_registered_count_on_delete
  AFTER DELETE ON registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_event_registered_count();

-- Create index for fast lookups
CREATE INDEX idx_registrations_event_id ON registrations(event_id);
CREATE INDEX idx_registrations_email ON registrations(email);
