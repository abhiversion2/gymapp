import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, ArrowLeft } from 'lucide-react';
import { Card } from '../../components/common/Card';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-12 px-4 sm:px-6 lg:px-8 text-[var(--color-text)] transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign Up
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center">
              <Dumbbell className="w-4 h-4" />
            </div>
            <span className="font-bold tracking-tight">ApexFit</span>
          </div>
        </div>

        <Card className="p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Privacy Policy</h1>
            <p className="text-sm text-[var(--color-muted)] mt-1">Last updated: September 2026</p>
          </div>

          <section className="space-y-3 text-sm text-[var(--color-muted)] leading-relaxed">
            <h2 className="text-base font-semibold text-[var(--color-text)]">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us during signup and profile creation, including your name, email address, mobile number, and optional date of birth. We also record workout sessions, weights, and measurements you submit.
            </p>

            <h2 className="text-base font-semibold text-[var(--color-text)]">2. How We Use Information</h2>
            <p>
              Your data is utilized solely to personalize workout tracking, monitor fitness progress, manage gym memberships, and maintain account security. We do not sell your personal information to third parties.
            </p>

            <h2 className="text-base font-semibold text-[var(--color-text)]">3. Data Security & Storage</h2>
            <p>
              Authentication credentials are encrypted using industry-standard password hashing through Supabase Auth. Your profile and metrics are secured via Row Level Security (RLS) guaranteeing that only you can access your private fitness records.
            </p>

            <h2 className="text-base font-semibold text-[var(--color-text)]">4. Account Deletion & Rights</h2>
            <p>
              You maintain the absolute right to view, update, export, or permanently delete your account and personal fitness history at any time through Account Settings.
            </p>
          </section>
        </Card>
      </div>
    </div>
  );
};
