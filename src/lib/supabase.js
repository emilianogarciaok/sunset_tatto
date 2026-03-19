import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://upffceioxzkmgqqoommj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwZmZjZWlveHprbWdxcW9vbW1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MzIxMTQsImV4cCI6MjA4OTUwODExNH0.aCl8di_TAgwsTzg78WL9qlRohTyJWfgJ1akbofjA4FY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
