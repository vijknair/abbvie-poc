#!/bin/bash
SCRIPT="/Users/vijnair/.claude/plugins/cache/adobe-skills/aem-edge-delivery-services/1.0.0/skills/scrape-webpage/scripts/analyze-webpage.js"
BASE="."
BATCH_SIZE=10

run_batch() {
  local pids=()
  for entry in "$@"; do
    url="${entry%%|*}"
    dir="${entry##*|}"
    echo "  Scraping: $url → $dir"
    node "$SCRIPT" "$url" --output "$BASE/$dir" &
    pids+=($!)
  done
  for pid in "${pids[@]}"; do
    wait "$pid"
  done
}

echo "=== Batch 1 ==="
run_batch \
  "https://www.qulipta.com/|import-work-qulipta" \
  "https://www.quliptahcp.com/|import-work-quliptahcp" \
  "https://www.rinvoq.com/|import-work-rinvoq-home" \
  "https://www.rinvoqhcp.com/|import-work-rinvoqhcp" \
  "https://www.skyrizi.com/|import-work-skyrizi-home" \
  "https://www.skyrizilocator.com/|import-work-skyrizilocator" \
  "https://www.skyrizihcp.com/|import-work-skyrizihcp" \
  "https://www.ubrelvy.com/|import-work-ubrelvy" \
  "https://www.ubrelvyhcp.com/|import-work-ubrelvyhcp" \
  "https://www.one.abbvieoncology.com|import-work-abbvieoncology"

echo "=== Batch 2 ==="
run_batch \
  "https://www.venclexta.com/|import-work-venclexta" \
  "https://www.vraylar.com/|import-work-vraylar-home" \
  "https://www.vraylarhcp.com/|import-work-vraylarhcp" \
  "https://www.botoxcervicaldystonia.com/|import-work-botoxcervicaldystonia" \
  "https://www.botoxchronicmigraine.com/|import-work-botoxchronicmigraine" \
  "https://www.botoxoveractivebladder.com/|import-work-botoxoveractivebladder" \
  "https://www.botoxone.com/|import-work-botoxone" \
  "https://www.botoxspasticity.com/|import-work-botoxspasticity" \
  "https://www.botox.com/|import-work-botox" \
  "https://www.creonhcp.com/|import-work-creonhcp"

echo "=== Batch 3 ==="
run_batch \
  "https://www.duopa.com/|import-work-duopa" \
  "https://www.duopahcp.com/|import-work-duopahcp" \
  "https://www.epkinly.com/|import-work-epkinly" \
  "https://www.epkinlyHCP.com/|import-work-epkinlyhcp" \
  "https://es.linzess.com/espanol|import-work-linzess-espanol" \
  "https://www.linzess.com/|import-work-linzess" \
  "https://www.linzesshcp.com/|import-work-linzesshcp" \
  "https://www.mavyret.com/|import-work-mavyret" \
  "https://www.mavyret.com/espanol|import-work-mavyret-espanol" \
  "https://www.mavyret.com/cost|import-work-mavyret-cost"

echo "=== Batch 4 ==="
run_batch \
  "https://www.mavyretpr.com/|import-work-mavyretpr" \
  "https://www.mavyret.com/hcp|import-work-mavyret-hcp" \
  "https://www.synthroid.com/|import-work-synthroid" \
  "https://www.synthroidhcppr.com/|import-work-synthroidhcppr" \
  "https://www.synthroidpro.com/|import-work-synthroidpro" \
  "https://www.vyalev.com/|import-work-vyalev" \
  "https://www.vyalevhcp.com/|import-work-vyalevhcp" \
  "https://www.lupronprostatecancer.com/|import-work-lupronprostatecancer" \
  "https://www.lupronprostatecancer.com/hcp|import-work-lupronprostatecancer-hcp" \
  "https://www.durystasavingsprogram.com/|import-work-durystasavingsprogram"

echo "=== Batch 5 ==="
run_batch \
  "https://www.durysta.com/|import-work-durysta" \
  "https://www.durystahcp.com/|import-work-durystahcp" \
  "https://www.emblaveo.com/|import-work-emblaveo" \
  "https://www.emrelis.com/|import-work-emrelis" \
  "https://www.emrelishcp.com/|import-work-emrelishcp" \
  "https://hcp.loloestrin.com/|import-work-loloestrin-hcp" \
  "https://www.loloestrin.com/|import-work-loloestrin" \
  "https://www.lupronped.com/|import-work-lupronped" \
  "https://www.oriahnn.com/|import-work-oriahnn" \
  "https://www.oriahnnhcp.com/|import-work-oriahnnhcp"

echo "=== Batch 6 ==="
run_batch \
  "https://www.orilissa.com/|import-work-orilissa" \
  "https://www.orilissa.com/cost|import-work-orilissa-cost" \
  "https://www.orilissa.com/hcp|import-work-orilissa-hcp" \
  "https://hcp.xengelstent.com/|import-work-xengelstent-hcp" \
  "https://hcp.ozurdex.com/|import-work-ozurdex-hcp" \
  "https://www.ozurdexsavingsprogram.com/|import-work-ozurdexsavingsprogram" \
  "https://www.ozurdex.com/|import-work-ozurdex-home" \
  "https://www.viberzi.com/|import-work-viberzi" \
  "https://www.vuity.com/|import-work-vuity" \
  "https://www.vuitypro.com/|import-work-vuitypro"

echo "=== Batch 7 ==="
run_batch \
  "https://www.creoninfo.com/|import-work-creoninfo" \
  "https://www.abbvieaccess.com/|import-work-abbvieaccess" \
  "https://www.allerganeyecare.com/|import-work-allerganeyecare" \
  "https://www.donttakespasticity.com/|import-work-donttakespasticity" \
  "https://www.crohnsandcolitis.com/|import-work-crohnsandcolitis" \
  "https://www.essentialsofibs.com/|import-work-essentialsofibs" \
  "https://www.faceyourbackpain.com/|import-work-faceyourbackpain" \
  "https://www.hepc.com/|import-work-hepc" \
  "https://www.hsdiseasesource.com/|import-work-hsdiseasesource" \
  "https://www.identifyepi.com/|import-work-identifyepi"

echo "=== Batch 8 ==="
run_batch \
  "https://www.nobsabouths.com/|import-work-nobsabouths" \
  "https://www.talkingibsc.com/|import-work-talkingibsc" \
  "https://www.psoriaticarthritisinfo.com/|import-work-psoriaticarthritisinfo" \
  "https://www.psoriasis.com/|import-work-psoriasis" \
  "https://www.pubertytoosoon.com/|import-work-pubertytoosoon" \
  "https://www.ra.com/|import-work-ra" \
  "https://www.eczemaheadquarters.com/|import-work-eczemaheadquarters" \
  "https://www.cllcancer.com/|import-work-cllcancer" \
  "https://www.digitalobgyn.com/|import-work-digitalobgyn" \
  "https://www.LateStageNSCLC.com/|import-work-latenstagensclc"

echo "=== Batch 9 ==="
run_batch \
  "https://www.humirapro.com/|import-work-humirapro" \
  "https://www.humira.com/|import-work-humira" \
  "https://www.humira.com/cost|import-work-humira-cost" \
  "https://www.infed.com/|import-work-infed" \
  "https://www.lastacaft.com/|import-work-lastacaft" \
  "https://www.lastacaft.com/doc|import-work-lastacaft-doc" \
  "https://www.hcv.com/|import-work-hcv" \
  "https://www.BurdenOfAD.com/|import-work-burdenofad" \
  "https://www.savella.com/|import-work-savella" \
  "https://www.cmetexplorer.com/|import-work-cmetexplorer"

echo "=== Batch 10 ==="
run_batch \
  "https://www.cdpldpconversion.com/|import-work-cdpldpconversion" \
  "https://www.rethinkingreceptorsinpd.com/|import-work-rethinkingreceptorsinpd" \
  "https://www.amlexpertconnect.com/|import-work-amlexpertconnect" \
  "https://www.abbviecfcommitment.com/|import-work-abbviecfcommitment" \
  "https://www.completerebate.com/|import-work-completerebate" \
  "https://www.beforeandafterportal.com/|import-work-beforeandafterportal" \
  "https://ibdbrochure.com/|import-work-ibdbrochure" \
  "https://www.allergansavingscard.com/|import-work-allergansavingscard" \
  "https://www.savewithays.com/|import-work-savewithays" \
  "https://cvd.abbvie.com/|import-work-cvd-abbvie"

echo "=== Batch 11 ==="
run_batch \
  "https://www.nova-catalog.abbvie.net/|import-work-nova-catalog" \
  "https://www.patientenrollmentsupport.com/|import-work-patientenrollmentsupport" \
  "https://www.requestfrm.com/|import-work-requestfrm" \
  "https://www.rheumfordialogue.abbvie.com/|import-work-rheumfordialogue" \
  "https://www.rxabbvie.com/|import-work-rxabbvie" \
  "https://www.usdermed.com/|import-work-usdermed" \
  "https://www.biomarkerboost.com/|import-work-biomarkerboost" \
  "https://www.elahere.com/|import-work-elahere" \
  "https://www.elaherehcp.com/|import-work-elaherehcp" \
  "https://www.vitiligorunsdeep.com/|import-work-vitiligorunsdeep"

echo "=== Batch 12 ==="
run_batch \
  "https://www.decnupaz.com/|import-work-decnupaz" \
  "https://www.decnupazhcp.com/|import-work-decnupazhcp" \
  "https://www.beyondagutfeeling.com/|import-work-beyondagutfeeling"

echo ""
echo "=== All done ==="
