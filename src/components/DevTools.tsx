import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { addSampleData, clearSampleData } from '@/utils/sampleData';
import { debugRegistration, completeRegistrationManually, clearSession } from '@/utils/debugRegistration';
import { testSupabaseConnection } from '@/utils/testSupabase';
import { toast } from 'sonner';

const DevTools = () => {
  const [loading, setLoading] = useState(false);

  const handleAddSampleData = async () => {
    setLoading(true);
    try {
      await addSampleData();
      toast.success('Sample data added successfully!');
    } catch (error) {
      toast.error('Failed to add sample data');
    } finally {
      setLoading(false);
    }
  };

  const handleClearSampleData = async () => {
    setLoading(true);
    try {
      await clearSampleData();
      toast.success('Sample data cleared successfully!');
    } catch (error) {
      toast.error('Failed to clear sample data');
    } finally {
      setLoading(false);
    }
  };

  const handleDebugRegistration = async () => {
    setLoading(true);
    try {
      await debugRegistration();
      toast.success('Debug info logged to console');
    } catch (error) {
      toast.error('Failed to debug registration');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteRegistration = async () => {
    setLoading(true);
    try {
      await completeRegistrationManually();
    } catch (error) {
      toast.error('Failed to complete registration');
    } finally {
      setLoading(false);
    }
  };

  const handleClearSession = async () => {
    setLoading(true);
    try {
      await clearSession();
    } catch (error) {
      toast.error('Failed to clear session');
    } finally {
      setLoading(false);
    }
  };

  const handleTestSupabase = async () => {
    setLoading(true);
    try {
      const success = await testSupabaseConnection();
      if (success) {
        toast.success('Supabase test completed - check console');
      } else {
        toast.error('Supabase test failed - check console');
      }
    } catch (error) {
      toast.error('Failed to test Supabase');
    } finally {
      setLoading(false);
    }
  };

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50">
      <CardHeader>
        <CardTitle className="text-sm">Development Tools</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <Button 
            onClick={handleAddSampleData} 
            disabled={loading}
            size="sm"
            className="w-full"
          >
            Add Sample Data
          </Button>
          <Button 
            onClick={handleClearSampleData} 
            disabled={loading}
            variant="destructive"
            size="sm"
            className="w-full"
          >
            Clear Sample Data
          </Button>
        </div>
        
        <div className="border-t pt-2">
          <p className="text-xs text-muted-foreground mb-2">Registration Debug:</p>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={handleDebugRegistration} 
              disabled={loading}
              size="sm"
              variant="outline"
              className="w-full"
            >
              Debug Registration
            </Button>
            <Button 
              onClick={handleCompleteRegistration} 
              disabled={loading}
              size="sm"
              variant="outline"
              className="w-full"
            >
              Complete Registration
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button 
              onClick={handleClearSession} 
              disabled={loading}
              size="sm"
              variant="outline"
              className="w-full"
            >
              Clear Session
            </Button>
            <Button 
              onClick={handleTestSupabase} 
              disabled={loading}
              size="sm"
              variant="outline"
              className="w-full"
            >
              Test Supabase
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DevTools;
