import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { AnalyticsAdminServiceClient } from '@google-analytics/admin';

// Initialize the clients
// These will automatically use process.env.GOOGLE_APPLICATION_CREDENTIALS
// if set, or other standard google auth methods.
const dataClient = new BetaAnalyticsDataClient();
const adminClient = new AnalyticsAdminServiceClient();

export const analyticsService = {
  /**
   * Fetches the top-level KPIs from Google Analytics Data API
   * Uses propertyId from env, or a passed one
   */
  async getKPIs(propertyId?: string) {
    const targetProperty = propertyId || process.env.GA_PROPERTY_ID;
    
    if (!targetProperty) {
      console.warn("GA_PROPERTY_ID not set. Returning placeholder KPI data.");
      return getPlaceholderKPIs();
    }

    try {
      const [response] = await dataClient.runReport({
        property: `properties/${targetProperty}`,
        dateRanges: [
          {
            startDate: '30daysAgo',
            endDate: 'today',
          },
        ],
        metrics: [
          { name: 'sessions' },
          { name: 'sessionConversionRate' },
          { name: 'averageSessionDuration' },
          { name: 'eventCount' }
        ],
      });

      const row = response.rows?.[0];
      if (!row || !row.metricValues) return getPlaceholderKPIs();

      return [
        { label: "Sessões Totais", val: formatNumber(row.metricValues[0].value), icon: "Users" },
        { label: "Taxa de Conversão", val: formatPercent(row.metricValues[1].value), icon: "TrendingUp" },
        { label: "Tempo Médio", val: formatDuration(row.metricValues[2].value), icon: "Eye" },
        { label: "Eventos Disparados", val: formatNumber(row.metricValues[3].value), icon: "BarChart3" }
      ];
    } catch (error) {
      console.error("Error fetching Google Analytics KPIs:", error);
      return getPlaceholderKPIs(); // Fallback so dashboard doesn't break
    }
  },

  /**
   * Admin API: Example to list accounts or properties
   */
  async listAccounts() {
    try {
      const [accounts] = await adminClient.listAccounts();
      return accounts;
    } catch (error) {
      console.error("Error listing GA accounts:", error);
      return [];
    }
  }
};

function getPlaceholderKPIs() {
  return [
    { label: "Sessões Totais", val: "124K", icon: "Users" },
    { label: "Taxa de Conversão", val: "3.2%", icon: "TrendingUp" },
    { label: "Tempo Médio", val: "2m 14s", icon: "Eye" },
    { label: "Eventos Disparados", val: "840K", icon: "BarChart3" }
  ];
}

function formatNumber(val?: string | null) {
  if (!val) return "0";
  const num = parseInt(val, 10);
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

function formatPercent(val?: string | null) {
  if (!val) return "0%";
  const num = parseFloat(val) * 100;
  return num.toFixed(1) + '%';
}

function formatDuration(val?: string | null) {
  if (!val) return "0s";
  const num = parseFloat(val);
  const minutes = Math.floor(num / 60);
  const seconds = Math.floor(num % 60);
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}
