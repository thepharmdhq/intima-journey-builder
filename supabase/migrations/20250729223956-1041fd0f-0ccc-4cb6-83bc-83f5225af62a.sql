-- Remove assessments with estimated_time greater than 10 minutes
DELETE FROM public.assessments 
WHERE estimated_time > 10;