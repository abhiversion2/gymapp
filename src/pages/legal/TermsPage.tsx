import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, ArrowLeft } from 'lucide-react';
import { Card } from '../../components/common/Card';

export const TermsPage: React.FC = () => {
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
            <h1 className="text-3xl font-extrabold tracking-tight">Terms of Service</h1>
            <p className="text-sm text-[var(--color-muted)] mt-1">Last updated: September 2026</p>
          </div>

          <section className="space-y-3 text-sm text-[var(--color-muted)] leading-relaxed">
            <h2 className="text-base font-semibold text-[var(--color-text)]">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the ApexFit gym and fitness application, you agree to be bound by these Terms of Service. If you do not agree to all terms, please refrain from using the application.
            </p>

            <h2 className="text-base font-semibold text-[var(--color-text)]">2. Fitness & Health Disclaimer</h2>
            <p>
              ApexFit provides fitness tracking, workout guidance, and training logs. Consult a physician before beginning any new exercise routine. Participation in gym activities is voluntary and at your own risk.
            </p>

            <h2 className="text-base font-semibold text-[var(--color-text)]">3. User Accounts</h2>
            <p>
              You are responsible for safeguarding your login credentials and maintaining the accuracy of your profile information. Notify support immediately upon detecting unauthorized account usage.
            </p>

            <h2 className="text-base font-semibold text-[var(--color-text)]">4. Membership & Access</h2>
            <p>
              Access to specific gym facilities, classes, and advanced workout tracking is subject to active membership status as recorded in your profile.
            </p>

            <h2 className="text-base font-semibold text-[var(--color-text)]">5. Modifications</h2>
            <p>
              ApexFit reserves the right to modify or replace these terms at any time. Continued use of the platform constitutes acceptance of revised terms.
            </p>
          </section>
        </Card>
      </div>
    </div>
  );
};
