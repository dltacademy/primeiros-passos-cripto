function gateUnavailableConversion(report) {
  const convert = report && report.convertOverride;
  if (!convert) return report;

  const offerUrl = convert.hideRef ? "#" : getOfferLink(convert.offerKey || "default");
  // A oferta é a única coisa que torna o bloco de conversão disponível. O
  // grupo não entra nesta conta: ele é gratuito e aparece de qualquer forma,
  // como brinde ao lado da oferta ou em bloco próprio quando não há oferta.
  const conversionAvailable = Boolean(offerUrl && offerUrl !== "#");

  const routingLabels = new Set(["roteamento", "próximo passo"]);
  const stats = Array.isArray(report.stats)
    ? report.stats.map((stat) => {
        if (!routingLabels.has(String(stat.label).toLowerCase())) return stat;
        if (!conversionAvailable) return { ...stat, value: "Sem oferta" };
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
