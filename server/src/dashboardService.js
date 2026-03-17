import { REFERRAL_STATUSES } from "./constants.js";

function countStatuses(referrals, stage) {
  return REFERRAL_STATUSES[stage].map((label) => ({
    label,
    value: referrals.filter((item) => item.stage === stage && item.status === label).length
  }));
}

function countGoals(referrals) {
  const totals = { Vivir: 0, Invertir: 0 };
  referrals.forEach((item) => {
    (item.goals || []).forEach((goal) => {
      if (totals.hasOwnProperty(goal)) {
        totals[goal] = (totals[goal] || 0) + 1;
      }
    });
  });
  return Object.entries(totals).map(([label, value]) => ({ label, value }));
}

function referralsPerCommune(referrals) {
  const grouped = referrals.reduce((acc, item) => {
    const commune = item.commune || "Sin especificar";
    acc[commune] = (acc[commune] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
}

export function buildDashboard(referrals, users, selectedUserId = "all") {
  const visibleReferrals =
    selectedUserId === "all"
      ? referrals
      : referrals.filter((item) => item.owner_user_id === selectedUserId);

  const activeUsers = new Set(visibleReferrals.map((item) => item.owner_user_id));

  return {
    totalReferrals: visibleReferrals.length,
    activeUsers: selectedUserId === "all" ? users.length : activeUsers.size,
    averageTicket:
      visibleReferrals.length === 0
        ? 0
        : Math.round(
            visibleReferrals.reduce((sum, item) => sum + Number(item.income || 0), 0) / visibleReferrals.length
          ),
    prospect: countStatuses(visibleReferrals, "prospecto"),
    contact: countStatuses(visibleReferrals, "contacto"),
    management: countStatuses(visibleReferrals, "gestion"),
    closing: countStatuses(visibleReferrals, "cierre"),

    goals: countGoals(visibleReferrals),
    topCommunes: referralsPerCommune(visibleReferrals),
    timeline: visibleReferrals.reduce((acc, item) => {
      const date = item.created_at ? item.created_at.slice(0, 10) : new Date().toISOString().slice(0, 10);
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {})
  };
}
