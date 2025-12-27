/*
  # Create Quote Requests Table

  ## Overview
  This migration creates a table to store customer quote requests from the pricing calculator.
  When customers submit a quote request, their selections and contact information are saved
  to this table instead of opening email/WhatsApp, allowing you to review and contact them.

  ## New Tables
  
  ### `quote_requests`
  Stores all customer quote requests with their selections and contact details
  
  - `id` (uuid, primary key) - Unique identifier for each request
  - `created_at` (timestamptz) - Timestamp when the request was submitted
  - `name` (text) - Customer's name
  - `email` (text) - Customer's email address
  - `phone` (text) - Customer's phone number
  - `message` (text, nullable) - Optional message from the customer
  - `core_flows` (jsonb) - Array of selected core flows (Prenotazioni, Ordini, Contatti)
  - `extra_flows` (jsonb) - Array of selected extra flows
  - `maintenance_service` (boolean) - Whether maintenance service was selected
  - `total_cost` (numeric) - Total calculated cost in euros
  - `status` (text) - Request status: 'new', 'contacted', 'converted', 'declined'
  - `notes` (text, nullable) - Internal notes about this request

  ## Security
  
  - Enable RLS on `quote_requests` table
  - Public users can INSERT their own requests (no auth required)
  - Only authenticated admins can view/update requests (you'll access via Supabase dashboard)

  ## Important Notes
  
  1. The table is designed to capture all information from the pricing calculator
  2. Status field helps track the lifecycle of each request
  3. Public can insert (so customers can submit without login)
  4. You'll review requests via the Supabase dashboard
*/

CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text,
  core_flows jsonb NOT NULL DEFAULT '[]'::jsonb,
  extra_flows jsonb NOT NULL DEFAULT '[]'::jsonb,
  maintenance_service boolean DEFAULT false,
  total_cost numeric NOT NULL,
  status text DEFAULT 'new',
  notes text
);

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert a quote request (public form submission)
CREATE POLICY "Anyone can submit quote requests"
  ON quote_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users (you as admin) can view all requests
CREATE POLICY "Authenticated users can view all requests"
  ON quote_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update requests (to change status, add notes)
CREATE POLICY "Authenticated users can update requests"
  ON quote_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);