-- Ensure necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 0. Utility: updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 1. Profiles table (rename id->user_id, add extra fields)
CREATE TABLE public.profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  biological_sex TEXT,
  gender_identity TEXT,
  relationship_status TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
-- Policies
CREATE POLICY "Profiles: select own" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Profiles: insert own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Profiles: update own" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);
-- Trigger
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();

-- 2. Assessments table (add updated_at, ENUMs)
-- ENUMs for category & sex_specific
DO $$ BEGIN
  CREATE TYPE public.assessment_category AS ENUM ('Relationship Health','Physical Intimacy','Self-Assessment','Emotional Connection');
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE TYPE public.sex_specific AS ENUM ('male','female');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

CREATE TABLE public.assessments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category public.assessment_category NOT NULL,
  estimated_time INTEGER NOT NULL,
  is_recommended BOOLEAN DEFAULT FALSE,
  sex_specific public.sex_specific,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- RLS
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Assessments: select public" ON public.assessments
  FOR SELECT USING (TRUE);
-- Trigger
CREATE TRIGGER trg_assessments_updated_at
  BEFORE UPDATE ON public.assessments
  FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();

-- 3. Assessment Questions (ENUM for question_type, service-only write)
DO $$ BEGIN
  CREATE TYPE public.question_type AS ENUM ('scale','multiple_choice','yes_no');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

CREATE TABLE public.assessment_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id TEXT REFERENCES public.assessments(id) ON DELETE CASCADE,
  question_number INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  question_type public.question_type NOT NULL,
  options JSONB,
  domain TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (assessment_id, question_number)
);
ALTER TABLE public.assessment_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Questions: select auth" ON public.assessment_questions
  FOR SELECT TO authenticated
  USING (TRUE);
CREATE POLICY "Questions: manage by service" ON public.assessment_questions
  FOR INSERT, UPDATE, DELETE
  USING (FALSE)
  WITH CHECK (auth.role() = 'service');
CREATE TRIGGER trg_questions_updated_at
  BEFORE UPDATE ON public.assessment_questions
  FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();

-- 4. User Sessions table for grouping
CREATE TABLE public.user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_type TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Sessions: select own" ON public.user_sessions
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Sessions: insert own" ON public.user_sessions
  FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Sessions: update own" ON public.user_sessions
  FOR UPDATE USING (user_id = auth.uid());
CREATE TRIGGER trg_sessions_updated_at
  BEFORE UPDATE ON public.user_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();

-- 5. User Assessment Responses
CREATE TABLE public.user_assessment_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  assessment_id TEXT REFERENCES public.assessments(id) ON DELETE CASCADE,
  session_id UUID REFERENCES public.user_sessions(id) ON DELETE CASCADE,
  question_id UUID REFERENCES public.assessment_questions(id) ON DELETE CASCADE,
  response_value TEXT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, question_id, session_id)
);
ALTER TABLE public.user_assessment_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Responses: select own" ON public.user_assessment_responses
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Responses: insert own" ON public.user_assessment_responses
  FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE TRIGGER trg_responses_updated_at
  BEFORE UPDATE ON public.user_assessment_responses
  FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();

-- 6. Assessment Results
CREATE TABLE public.assessment_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  assessment_id TEXT REFERENCES public.assessments(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES public.user_sessions(id) ON DELETE CASCADE,
  overall_score NUMERIC(5,2) NOT NULL,
  domain_scores JSONB NOT NULL,
  executive_summary TEXT,
  top_strengths TEXT[],
  areas_for_growth TEXT[],
  recommendations TEXT[],
  next_action_days INTEGER DEFAULT 90,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Results: select own" ON public.assessment_results
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Results: insert by service" ON public.assessment_results
  FOR INSERT WITH CHECK (auth.role() = 'service');
CREATE TRIGGER trg_results_updated_at
  BEFORE UPDATE ON public.assessment_results
  FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();