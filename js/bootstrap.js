function gateUnavailableConversion(report) {
  const convert = report && report.convertOverride;
  if (!convert) return report;

  const offerUrl = convert.hideRef ? "#" : getOfferLink(convert.offerKey || "default");
  const hasOffer = Boolean(offerUrl && offerUrl !== "#");
  const hasTelegram = convert.publicTelegram === true && isTelegramConfigured();
  const conversionAvailable = hasOffer || hasTelegram;

  const routingLabels = new Set(["roteamento", "próximo passo"]);
  const stats = Array.isArray(report.stats)
    ? report.stats.map((stat) => {
        if (!routingLabels.has(String(stat.label).toLowerCase())) return stat;
        if (!conversionAvailable) return { ...stat, value: "Sem oferta" };
        if (stat.value === "Conta elegível") return { ...stat, value: "Oferta opcional" };
        return stat;
      })
    : report.stats;

  if (conversionAvailable) return { ...report, stats };
  return { ...report, stats, convertOverride: null };
}

if (typeof FLOW !== "undefined" && typeof FLOW.buildReport === "function") {
  const buildReport = FLOW.buildReport.bind(FLOW);
  FLOW.buildReport = (answers) => gateUnavailableConversion(buildReport(answers));
}

const flowRoot = document.getElementById("flow-root");
if (flowRoot && typeof renderFlow === "function" && typeof FLOW !== "undefined") {
  renderFlow(flowRoot, FLOW);
}

loadGoatCounter();
