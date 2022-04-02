
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://epowhiqqzsmspubeowcb.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwb3doaXFxenNtc3B1YmVvd2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDg3Mzc0MzksImV4cCI6MTk2NDMxMzQzOX0.tO4iyhMjjcPrdutSm4XZB5hnFLItInI1EaDN2oG-kT0"
export const supabase = createClient(supabaseUrl, supabaseKey)