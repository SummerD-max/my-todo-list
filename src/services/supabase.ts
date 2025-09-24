import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://nmaleysbcbrgeinmqjlb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tYWxleXNiY2JyZ2Vpbm1xamxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MTgwMjMsImV4cCI6MjA3NDI5NDAyM30.p8pG3xQla98wvhtJfrKDfoBhoy0224mKrjd3qL7bhPs";
export const supabase = createClient(supabaseUrl, supabaseKey);
