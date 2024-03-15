import "../Styles/contract.css";
import React, { useRef } from "react";
import octoLogo from "../assets/OctoZwart.png";
import HtArthur from "../assets/HtArthur.png";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";

const CreateContactForm = (props) => {
  console.log(props);
  const contract = useRef();

  const handleContract = () => {
    /* let jsPdf = new jsPDF("p", "pt", "letter");
    var htmlElement = document.getElementById("contract-content-container");
    // you need to load html2canvas (and dompurify if you pass a string to html)
    const opt = {
      callback: function (jsPdf) {
        jsPdf.save("Test.pdf");
        // to open the generated PDF in browser window
        // window.open(jsPdf.output('bloburl'));
      },
      margin: [30, 30, 30, 30],
      autoPaging: "text",
      html2canvas: {
        allowTaint: true,
        dpi: 300,
        letterRendering: true,
        logging: false,
        scale: 0.7,
      },
    };

    
    jsPdf.html(htmlElement, opt); */

    //CHATGPT
    /*     console.log(props.data);
    const pages = Array.from(
      contract.current.querySelectorAll(".contract-content-container")
    );
    const pdf = new jsPDF();

    let yOffset = 0;
    let pagePromises = [];

    pages.forEach((page, index) => {
      pagePromises.push(
        html2canvas(page).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");

          if (index !== 0) {
            pdf.addPage();
            yOffset = 0; // Reset yOffset for new page
          }

          pdf.addImage(imgData, "PNG", 15, yOffset, 180, 160);
          yOffset += canvas.height + 10; // Add height of the canvas plus some extra space for separation
        })
      );
    });

    Promise.all(pagePromises).then(() => {
      pdf.save(`${props.data.name}.pdf`);
    });
 */
    //HTML2CAANVAS + JSPDF (alles merged on one page)
    /* 
    console.log("pdf generating");
    html2canvas(contract.current).then((canvas) => {
      let base64image = canvas.toDataURL("image/png");
      let pdf = new jsPDF("p", "px", ["1600", "1311"]);
      pdf.addImage(base64image, "PNG", 15, 15, 1110, 381);
      pdf.save(`${props.data.name}.pdf`);
    }); */

    //HTML2PDF.JS
    const opt = {
      margin: 0.5,
      pagebreak: { mode: "avoid-all", before: "#page2el" },
      filename: `${props.data.name}.pdf`,
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      image: { type: "jpeg", quality: 1 },
    };

    const element = contract.current;

    const pages = element.querySelectorAll(".contract-content-container");
    console.log("THESE ARE PAGES", pages);

    const pdf = html2pdf();
    pdf.from(element).set(opt).save();

    /*     pages.forEach((page, index) => {
      console.log("THIS IS A PAGE");
      const pageNumber = document.createElement("div");
      
      console.log("PageNumber", pageNumber);

      pageNumber.className = "page-number";
      pageNumber.textContent = `Page ${index + 1}`;

      page.appendChild(pageNumber);
    }); */
  };

  //yt video aanpak
  /*     const input = contract.current;
    html2canvas(input).then((canvas)=>{
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm')
    }) */

  return (
    <div className="contract-form-wrapper">
      <div className="generate-pdf-wrapper">
        <button
          onClick={handleContract}
          className={`button ${
            props.data.generatePDF ? "generate-pdf" : "no-pdf"
          }`}
        >
          Generate PDF
        </button>
      </div>
      <div ref={contract} className="contract-content-wrapper">
        <div
          className="contract-content-container"
          id="contract-content-container"
        >
          <div>
            <div className="top-line--yellow"></div>
            <div className="top-line--black"></div>
            <div className="octo-logo">
              <img
                className="main-logo"
                src={octoLogo}
                alt="Zwarte OctoSales Logo"
              />
            </div>
            <h2>DIENSTVERLENINGSOVEREENKOMST</h2>
            <br />
          </div>

          <div className="contract-content-part--flex">
            <h3 className="contract-content-part--flex-title">Tussen:</h3>
            <div className="contract-content-part--flex-text">
              <div>
                <h3>OctoSales (Nottebaert consult bv),</h3>
                <br />
                KBO BTW 0779.812.001, met maatschappelijke zetel te Tivolistraat
                127, 9700 Oudenaarde, rechtsgeldig vertegenwoordigd door
                Charles-Arthur Nottebaert , in zijn hoedanigheid van
                zaakvoerder.
                <br />
                Hierna verkort “de Dienstverlener”
              </div>
              <div>
                <h3>En: {props.data.name},</h3>
                <br />
                KBO BTW {props.data.btw}, met maatschappelijke zetel te{" "}
                {props.data.address}, rechtsgeldig vertegenwoordigd door{" "}
                {props.data.representativeName}, hiertoe behoorlijk
                gevolmachtigd.
                <br />
                Hierna verkort “de opdrachtgever”
                <br />
                De Dienstverlener en de opdrachtgever worden hierna individueel
                een “partij” en gezamenlijk de “partijen” genoemd.
              </div>
            </div>
          </div>
          <div className="contract-content-part">
            <h3>Wordt voorafgaandelijk het volgende uiteengezet: </h3>
            <p>
              In het kader van het realiseren van verschillende van zijn
              projecten, wenst de opdrachtgever een beroep te doen op de
              gespecialiseerde dienstverlening van de Dienstverlener, gelet op
              de specifieke knowhow, capaciteit en geschoolde uitvoerders van
              deze Dienstverlener. Partijen wensen hun wederzijdse rechten en
              verplichtingen vast te leggen in het kader van deze
              dienstverlening. Met deze overeenkomst wensen partijen een kader
              te creëren voor een professionele samenwerking.
            </p>
          </div>

          <div className="contract-content-part" id="part-1">
            <h3>Wordt overeengekomen en aanvaard wat volgt:</h3>

            <h3>1. Voorwerp</h3>
            <div>
              <p>
                De opdrachtgever doet beroep op de Dienstverlener voor externe
                ondersteuning bij onder meer:
              </p>
              <p>{props.data.description}</p>
              <p>
                Indien tijdens de uitvoering van deze overeenkomst blijkt dat de
                opdracht moet worden gewijzigd of uitgebreid, hetzij op vraag
                van de opdrachtgever, hetzij op grond van bijkomende
                inlichtingen die door de Dienstverlener werden verkregen, hetzij
                om te kunnen rekening houden met de meest recente technieken,
                hetzij voor om het even welke andere reden, verplicht de
                Dienstverlener er zich toe de opdrachtgever onmiddellijk in te
                lichten over de weerslag die deze omstandigheden zullen hebben
                op de wijziging van deze overeenkomst, de technische realisatie
                van de opdracht, de uitvoeringstermijnen en de prijs. Deze
                wijzigingen zullen het voorwerp uitmaken van een bijlage bij
                voorliggende overeenkomst, ondertekend door beide partijen.
              </p>
            </div>
          </div>
          <div className="contract-content-part" id="part-2">
            <h3>2. Aanvang en duur</h3>
            <p>
              2.1 Deze overeenkomst wordt aangegaan voor onbepaalde duur en
              vangt aan op moment van ondertekening van onderhavige
              overeenkomst.
            </p>

            <strong>
              <p>
                De overeenkomst kan door één van beide partijen opgezegd worden
                mits het respecteren van een opzegtermijn van één week.
              </p>

              <p>
                Deze opzeggingstermijn vangt aan op de maandag volgend op de
                datum van verzending van het aangetekend schrijven of
                wederzijdse bevestiging via mailverkeer met het e-mailadres:
                <a href="mailto:career@octosales.be">career@octosales.be</a>
              </p>
            </strong>
            <p>
              2.2 De overeenkomst wordt automatisch beëindigd indien de
              uitvoering ervan definitief onmogelijk is geworden door overmacht.
              De meest gerede partij moet de andere partij binnen de 7 dagen
              schriftelijk verwittigen van de ontstane
              <br />
              overmacht.
            </p>
            <p>
              2.3 Deze overeenkomst kan enerzijds worden beëindigd conform de
              middelen van gemeen recht, zoals bepaald in de artikelen 5.244 en
              volgende van het Burgerlijk Wetboek. Anderzijds zoals bepaald in
              artikel 2.1 kunnen beide partijen deze overeenkomst beëindigen
              door middel van een opzeggingstermijn van één week betekend per
              aangetekende brief gericht aan de wederpartij of wederzijdse
              bevestiging via mailverkeer met het e-mailadres:
              <a href="mailto:career@octosales.be">career@octosales.be</a>. De
              opzeggingstermijn vangt aan op de maandag volgend op de datum van
              verzending van het aangetekend schrijven. Na de opzeggingstermijn,
              dienen de verbintenissen voortvloeiend uit deze overeenkomst niet
              meer door de partijen te worden nageleefd, onverminderd wat
              verderop of in de deelovereenkomst wordt bepaald.
            </p>
            <p>
              2.4 Indien de opzegging eenzijdig door de opdrachtgever
              plaatsvindt zonder inachtname van deze periode, wordt
              overeenkomstig artikel 1794 van het Burgerlijk Wetboek, een
              forfaitaire schadevergoeding aangerekend van 500 EUR voor al de
              uitgaven van de Dienstverlener, al zijn arbeid, en alles wat hij
              bij die opdracht had kunnen winnen. De overeenkomst wordt
              geschorst vanaf het ogenblik dat de Dienstverlener één week in de
              onmogelijkheid verkeert haar taken uit te oefenen, totdat
              laatstgenoemde deze taken hervat.
            </p>
            <div>
              <p>
                Onderhavige overeenkomst wordt met onmiddellijke ingang en
                zonder enige vergoeding beëindigd in geval van zware fout. Onder
                zware fout wordt onder andere verstaan: -een aangetoonde inbreuk
                op de vertrouwelijkheidsclausule (confidentialiteit);{" "}
              </p>
              <ul>
                <li>
                  het onachtzaam omspringen met materialen van de opdrachtgever
                  of toegekend budget na meerdere ingebrekestellingen van de
                  opdrachtgever ten nadele van de Dienstverlener;
                </li>
                <li>
                  het duidelijk en vaststaand veroorzaken van conflicten met de
                  vaste medewerkers van de opdrachtgever en/of klanten van de
                  opdrachtgever;
                </li>
                <li>
                  het ontvreemden van materialen van de opdrachtgever en dit in
                  de meest ruime zin van het woord; -misbruik van vertrouwen
                  door één partij (of beide partijen) wat een onmiddellijke
                  beëindiging tot gevolg heeft;
                </li>
                <li>deze opsomming is niet limitatief.</li>
              </ul>
            </div>
            <p>
              Het verrichte werk wordt geacht definitief aanvaard te zijn door
              de opdrachtgever bij gebrek aan enig protest door aangetekend
              schrijven binnen 5 kalenderdagen na voorlegging van de
              prestatiestaat door de Dienstverlener.
            </p>
          </div>
          <div className="contract-content-part" id="part-3">
            <h3>3 Plaats van uitvoering </h3>
            <p>
              De diensten worden geleverd aan de opdrachtgever of één of
              meerdere van haar klanten, in de gebouwen van de opdrachtgever of
              bij één of meerdere van haar klanten, tenzij anders
              overeengekomen.
            </p>
          </div>
          <div className="contract-content-part" id="part-4">
            <h3>4. Rechten en plichten Dienstverlener</h3>
            <div>
              <h4 className="underline">4.1 Uitvoerders </h4>
              <p>
                Met de uitvoering van de overeenkomst worden door de
                Dienstverlener één of meerdere uitvoerder(s) belast, hierna
                genoemd “de uitvoerder(s)”. Dit zijn de door de Dienstverlener
                aangestelde personen die de prestaties zullen uitvoeren
                (mandatarissen, agenten, personeelsleden of zelfstandige
                medewerkers).
              </p>
              <h4 className="underline">4.2 Verantwoordelijkheid</h4>
              <div>
                <strong>1</strong> <br /> De huidige overeenkomst is een
                middelenverbintenis en geen resultaatsverbintenis. De
                aansprakelijkheid van de Dienstverlener is strikt beperkt tot de
                hem toevertrouwde taken. De Dienstverlener is niet
                verantwoordelijk voor de gevolgen van vergissingen, fouten of
                vergetelheden van de opdrachtgever in de hem toevertrouwde
                opdracht, noch voor vergissingen, fouten of vergetelheden in de
                uitvoering bewerkstelligd door de opdrachtgever of door een
                derde.
                <br />
              </div>
              <div>
                <strong>2</strong> <br /> De Dienstverlener verbindt zich ertoe
                om voor het leveren van de diensten een beroep te doen op
                uitvoerders die over de nodige competenties en vakkennis
                beschikken om de overeengekomen opdrachten uit te voeren binnen
                de overeengekomen termijn. De uitvoerders van de Dienstverlener
                moeten de werkzaamheden met betrekking tot de verschillende
                opdrachten uitvoeren naar beste kennis en vermogen, rekening
                houdend met de toepasselijke reglementen en voorschriften.
                <br />
              </div>
              <div>
                <strong>3</strong> <br /> De Dienstverlener is gevrijwaard van
                elke aansprakelijkheid in het geval de dienstverlening niet kan
                worden gegarandeerd wanneer de opdrachtgever niet alle knowhow
                en andere benodigde informatie meedeelt of bezorgt, ook
                confidentiële, die de Dienstverlener nodig heeft voor de
                vervulling van zijn opdrachten.
                <br />
                De Dienstverlener bezorgt de overeenkomstige facturen inzake
                zijn prestaties uiterlijk 1 kalenderweek na de desbetreffende
                uitgevoerde prestaties.
                <br />
                <strong>
                  De prestaties worden wekelijks aan de Opdrachtgever
                  gefactureerd
                </strong>
                <br />
              </div>
              <div>
                <strong>4</strong> <br /> De Dienstverlener verklaart alle
                vertrouwelijke informatie waarvan hij kennis krijgt gedurende de
                dienstverlening en tot 12 maanden na het einde van het contract
                vertrouwelijk te houden en deze verbintenis te doen naleven door
                zijn uitvoerders. Vertrouwelijke informatie betreft: bedrijfs-
                of eigendomsinformatie, informatie met betrekking tot producten,
                cliënteel, zakenrelaties, financiële of contractuele afspraken
                met betrekking tot de opdrachtgever en/of alle vennootschappen
                van de groep waarvan de opdrachtgever deel uitmaakt.
                <br />
                Bij de beëindiging van de onderhavige overeenkomst, om welke
                reden ook, of op eenvoudig verzoek van de opdrachtgever tijdens
                de overeenkomst, zal de Dienstverlener alle vertrouwelijke
                informatie onmiddellijk overmaken aan de opdrachtgever.
                <br />
              </div>
            </div>
            <div>
              <h4 className="underline">
                4.4 Verantwoordelijkheid ten aanzien van personeel{" "}
              </h4>
              <div>
                <strong>1</strong> <br /> De Dienstverlener is verantwoordelijk
                voor de naleving van de toepasselijke wetgeving en de
                arbeidsreglementering ten opzichte van zijn werknemers waarop
                hij desgevallend een beroep doet voor een opdracht. Dit omvat
                maar is niet beperkt tot:
                <ul>
                  <li>arbeidstijd en rusttijd;</li>
                  <li>bedrag van het minimumloon;</li>
                  <li>gelijke behandeling;</li>
                  <li>veiligheid, gezondheid en hygiëne op het werk;</li>
                </ul>
                <br />
              </div>
              <div>
                <strong>2</strong> <br /> De Dienstverlener zal de goede
                uitvoering van de overeengekomen opdrachten verzekeren en in
                voorkomend geval instaan voor de naleving van de overeengekomen
                planning en uitvoeringstermijnen.
                <br /> Ingeval de Dienstverlener de hem toevertrouwde opdrachten
                niet kan voortzetten, zal hij de opdrachtgever onmiddellijk op
                de hoogte brengen, zodat deze laatste de nodige maatregelen kan
                nemen, inclusief het aan een derde toevertrouwen van de
                betrokken opdrachten.
                <br />
              </div>
              <div>
                <strong>3</strong> <br /> De autoriteit en verantwoordelijkheid
                ten opzichte van de uitvoerder(s)-werknemers behoren toe aan de
                Dienstverlener. Een uitvoerder staat niet onder het gezag van de
                opdrachtgever. De Dienstverlener en de opdrachtgever verbinden
                zich ertoe strikt de bepalingen van de wet van 27 juli 1987 na
                te leven.
                <br /> De opdrachtgever is bijgevolg gerechtigd om de
                uitvoerders richtlijnen mee te geven inzake de uitvoering van de
                opdrachten volgens de lijnen uiteengezet in deze overeenkomst:
                <br />
                *richtlijnen in verband met de uitvoering van het in onderhavige
                dienstverleningsovereenkomst overeengekomen werk, en meer
                specifiek omtrent:
                <ul>
                  <li>te behalen deadlines</li>
                  <li>prioritaire taken en opdrachten</li>
                  <li>kwaliteitsvereisten</li>
                  <li>arbeidstijden</li>
                </ul>
                <p>
                  De opdrachtgever zal trouwens niet het werkgeversgezag
                  uitoefenen ten aanzien van de uitvoerders. De dagelijkse
                  leiding over het personeel (uitvoerders-werknemers) wordt
                  uitgevoerd onder de eigen verantwoordelijkheid van de
                  Dienstverlener.
                </p>
                <br />
              </div>
            </div>
            <div>
              <h4 className="underline">4.5 Zwaarwichtige tekortkomingen</h4>
              <p>
                In geval van niet-naleving door de Dienstverlener van één van de
                bepalingen vermeld in 4.2, 4.3, en 4.4, wordt dit beschouwd als
                een zwaarwichtige tekortkoming in hoofde van de Dienstverlener
                waardoor de opdrachtgever deze overeenkomst (en in navolging:
                automatische beëindiging van de deelovereenkomsten) ten laste
                van de Dienstverlener met onmiddellijke ingang kan ontbinden,
                zonder voorafgaande verwittiging. De Dienstverlener is in dat
                geval gehouden de opdrachtgever te vergoeden voor de directe
                schade die de opdrachtgever heeft geleden.
              </p>
            </div>
          </div>
          <div className="contract-content-part" id="part-5">
            <h3>5. Rechten en plichten opdrachtgever</h3>
            <p>
              <strong>5.1</strong> De opdrachtgever verbindt er zich toe aan de
              Dienstverlener alle knowhow en andere benodigde informatie,
              evenals confidentiële informatie, mee te delen, noodzakelijk voor
              de vervulling van de opdrachten bepaald in de deelovereenkomsten.
            </p>
            <p>
              <strong>5.2</strong> De opdrachtgever is ertoe gehouden de
              uitvoerders in te lichten over de mogelijke risico’s verbonden aan
              de opdracht.
              <br />
              De Dienstverlener zal voor het uitvoeren van de opdracht enkel
              goed geïnstrueerd en opgeleide uitvoerders inzetten, onder de
              voorwaarden van deze overeenkomst.
            </p>
            <p>
              <strong>5.3</strong> De opdrachtgever heeft het recht om de werken
              te controleren. Hiermee doet hij geenszins afbreuk aan de
              autonomie waarin de Dienstverlener het werk verricht.
            </p>
          </div>
          <div className="contract-content-part" id="part-6">
            <h3>6. Rechten en plichten opdrachtgever</h3>
            <p>
              <strong>6.1</strong> De opdrachtgever en aanverwante bedrijven
              verbinden zich ertoe geen enkele vorm van samenwerking aan te gaan
              met personeel, aangestelden of uitvoerders van de Dienstverlener,
              noch rechtstreeks noch onrechtstreeks, en dit zowel tijdens de
              duur van de overeenkomst als tijdens een periode van 12 maanden
              nadat de prestaties beëindigd of opgeschort zijn of wanneer
              kandidaten zijn voorgesteld. Indien een inbreuk hierop wordt
              vastgesteld is er een forfaitaire schadevergoeding verschuldigd
              van 8.500 EUR.
            </p>
            <p>
              <strong>6.2</strong> De opdrachtgever en aanverwante bedrijven
              kunnen een student van de Dienstverlener volledig overnemen voor
              een flat fee van{" "}
              {props.data.pricing.fee ? props.data.pricing.fee : 4500} EUR. De
              student kan aan de fee van{" "}
              {props.data.pricing.fee ? props.data.pricing.fee : 4500} euro
              overgenomen worden ten laatste 12 maanden voor het afstuderen. De
              overname zal uitdrukkelijk bevestigd worden door de Dienstverlener
              via mail of aangetekend schrijven.
            </p>
            <p>
              <strong>6.3</strong> Indien de overname of de tewerkstelling gaat
              over een stage dan kan de opdrachtgever en aanverwante bedrijven
              een student van de Dienstverlener volledig overnemen of
              tewerkstellen voor een flat van{" "}
              {props.data.pricing.internship ? props.data.internship : 3500}
              per uitvoerder, personeelslid of aangestelde. De overname zal
              uitdrukkelijk bevestigd worden door de Dienstverlener via mail of
              aangetekend schrijven.
            </p>
            <p>
              <strong>6.4</strong> De opdrachtgever en aanverwante bedrijven
              kunnen een Young Graduate bediende of freelancer van de
              Dienstverlener volledig overnemen voor een flat fee van{" "}
              {props.data.pricing.ygFee ? props.data.pricing.ygFee : 7000}. De
              overname zal uitdrukkelijk bevestigd worden door de Dienstverlener
              via mail of aangetekend schrijven.
            </p>
            <div>
              <strong>6.5</strong> De opdrachtgever en aanverwante bedrijven
              kunnen een Young Professional bediende of freelancer van de
              Dienstverlener volledig overnemen voor een % fee van het
              brutojaarloon, inclusief vakantiegeld, van het aangeworven
              profiel. Dit is voor:
              <ul>
                <li>Young Professional: 23 %</li>
                <li>Advanced Young Professional: 24%</li>
                <li>Technical Young Professional: 25%</li>
              </ul>
              <p>
                De overname zal uitdrukkelijk bevestigd worden door de
                Dienstverlener via mail of aangetekend schrijven.
              </p>
            </div>
            <p>
              <strong>6.6</strong> OctoSales werkt volledig volgens het no cure
              no pay principe. Er wordt dus geen opstartkost aangerekend. De fee
              is enkel verschuldigd als het bedrijf en de student, stagiair,
              bediende of freelancer een akkoord bereiken of binnen 12 maanden
              nadat de kandidaat is voorgesteld maar de bedrijf die niet
              aanvaardt. Fees worden in twee schijven gefactureerd: 50% van de
              fee wordt gefactureerd op het moment van contractondertekening
              tussen kandidaat en werkgever. De andere 50% wordt gefactureerd{" "}
              {props.data.payDate} het ogenblik van effectieve opstart van de
              samenwerking tussen klant en kandidaat.
            </p>
            <div>
              <strong>6.7</strong>De klant kan ook een student, bediende of
              freelancer aanwerven nadat die door OctoSales werd gedetacheerd
              naar de klant. Daarvoor gelden volgende principes.
              <p>
                6.7.1 Overname vrij van fee: de klant kan de student aanwerven
                zonder enige betaling van een selectiefee nadat hij 900 uren als
                student bij de klant heeft gepresteerd via de tussenkomst van
                OctoSales. Voor bedienden of freelancers geldt een basis van 20
                volledige dagen.
              </p>
              <p>
                6.7.2 Overname na reeds gewerkte periode: indien de klant de
                kandidaat wil overnemen na een reeds gewerkte periode via
                OctoSales dan kan de flat fee vermeld in artikel 6.2,
                afhankelijk van de situatie waar de kandidaat zich in bevindt,
                pro rata in vermindering gebracht worden in verhouding met de
                reeds gepresteerde uren. Als basis voor studenten wordt 900 uren
                gehanteerd en voor bedienden en freelancers 20 volledige dagen.
              </p>
            </div>
          </div>
          <div className="contract-content-part" id="part-7">
            <h3>7. Aansprakelijkheid</h3>
            <p>
              De Dienstverlener kan niet aansprakelijk gesteld worden voor de
              onrechtstreekse schade. Met andere woorden : financiële of
              commerciële verliezen die niet het rechtstreekse of onmiddellijke
              gevolg zijn van een tekortkoming van de Dienstverlener onder meer
              de winstderving, de verhoging van de algemene kosten, het
              verstoren van de planning, het verlies van materieel, het verlies
              van de verhoopte winst van cliënteel of besparingen.
            </p>
            <p>
              De aansprakelijkheid van de Dienstverlener hoe ernstig de fout ook
              is, behalve in geval van bedrog, beperkt is tot schade waarvoor
              zij aansprakelijk is.
            </p>
            <p>
              De aansprakelijkheid van de Dienstverlener is strikt beperkt tot
              de hem toevertrouwde taken en kan nooit de waarde van de
              dienstverleningsovereenkomst overstijgen. De Dienstverlener is
              niet verantwoordelijk voor de gevolgen van vergissingen, fouten of
              vergetelheden van de opdrachtgever in de hem toevertrouwde
              opdracht, noch voor vergissingen, fouten of vergetelheden in de
              uitvoering bewerkstelligd door de opdrachtgever of door een derde.
            </p>
            <p>
              De Dienstverlener zal de werkzaamheden met betrekking tot deze
              opdracht uitvoeren naar beste kennis en vermogen, volgens de
              regels van de kunst en rekening houdend met de reglementen en
              voorschriften terzake. Indien de Dienstverlener fouten ontdekt in
              documenten door de opdrachtgever of door derden opgesteld, zal hij
              de opdrachtgever hiervan op de hoogte brengen. De Dienstverlener
              dient bij de uitvoering van het werk te handelen met de vereiste
              zorgvuldigheid die in het maatschappelijk verkeer betaamt, zowel
              ten aanzien van de persoon van de opdrachtgever en diens goederen
              als ten aanzien van derden.
            </p>
          </div>
          <div className="contract-content-part" id="part-8">
            <h3>Honorarium</h3>
            <p>
              Het honorarium bevat de knowhow, de proceskennis, de directe
              kosten (bedrijfslasten), de algemene kosten, de dekking van
              risico’s, de winst van de Dienstverlener en de kosten die de
              Dienstverlener draagt om te voldoen aan alle Belgische
              minimumvoorwaarden die de Dienstverlener dient te dragen ten
              gevolge van de aannemingsopdrachten.
            </p>

            <strong>
              Het honorarium bedraagt {props.data.pricing.hourlyPay} ex. BTW
              behoudens andere bepalingen opgenomen in onderhavige overeenkomst.
            </strong>

            <p>
              De bovenvermelde vergoeding omvat alle kosten zoals
              werkgeversbijdragen aan de RSZ, vakantiegeld, wetsverzekering voor
              arbeidsongevallen, arbeidsongevallen, administratie en
              beheerskosten, rekruterings- en selectiekosten en brutoloon
              student, exclusief sociale voordelen, BTW, maaltijdcheques,
              ecocheques, woon-werkverkeer en burgerlijke aansprakelijkheid. De
              Dienstverlener verbindt er zich toe om zoveel als mogelijk
              voorzienbare kosten voorafgaandelijk aan de opdrachtgever voor te
              leggen. Andere door de Dienstverlener gemaakte kosten zullen apart
              worden gefactureerd en ook voorgelegd worden ter goedkeuring aan
              de opdrachtgever.
            </p>

            <div>
              Volgende coëfficiënten zijn van toepassing voor kosten die niet
              inbegrepen zijn in de vergoeding:
              <ul>
                <li>Ecocheques: 1,69 op de totale waarde</li>
                <li>
                  Maaltijdcheques: 1,69 op de werkgeversbijdragen en op het
                  totale bedrag is er een dienstenprestatie van 3,5% verbonden
                </li>
                <li>Mobiliteitspremie: 1,35</li>
                <li>Andere sociale voordelen: 1,25</li>
                <li>Nettopremies: 1,25</li>
              </ul>
            </div>
            <p>
              De eventuele onkosten (voor verplaatsingen, maaltijden, hotel,
              enz...) van meer dan 50 EUR per dag, gemaakt in de loop van de
              opdrachten door een uitvoerder van de Dienstverlener, worden, na
              akkoord van de opdrachtgever, vergoed op basis van
              gerechtvaardigde documenten. Deze onkosten worden gefactureerd aan
              kostprijs met een toeslag van 0%. De bewijsstukken dienen
              maandelijks gehecht te worden aan het document waarin deze
              onkosten worden samengevat en dienen alle aanwijzingen te
              vermelden die vervat zijn in de door de opdrachtgever gebruikte
              onkostennota's, meer in het bijzonder de aard van deze kosten, de
              data en de nummers van de werkzaamheden waarop ze geboekt moeten
              worden. Het hierboven vermelde document dient door de
              opdrachtgever voor akkoord ondertekend te worden.
            </p>
            <p>
              Het Honorarium is onderhevig aan een 6-maandelijkse indexering op
              basis van de consumptieindex en dit op de verjaardag van de
              inwerkingtreding van onderhavige dienstverleningsovereenkomst,
              alsook een jaarlijkse indexering die ingang vindt op 1 januari van
              het aankomende jaar. Deze aanpassing geschiedt op basis van de
              schommelingen van de consumptieindex. Deze aanpassing is gelijk
              aan het bedrag dat verkregen wordt door de toepassing van de
              hiernavolgende formule:
            </p>
            <div className="part-8-formule">
              <div className="part-8-formule--left">
                <p>basis vergoeding x nieuwe index</p>
                <div className="part-8-formule--left-divider"></div>
                <p>Aanvangsindex</p>
              </div>
              <p className="part-8-formule--right">= nieuwe vergoeding</p>
            </div>

            <p>
              De elementen van deze formule worden als volgt omschreven: de
              basis vergoeding: het hiervoor vermelde honorarium; nieuwe index:
              het cijfer van de consumptieindex van de maand die aan de
              aanpassing van het honorarium voorafgaat of december van het
              voorgaande jaar voor de jaarlijkse indexering; aanvangsindex: het
              cijfer van de consumptieindex van de maand die voorafgaat aan de
              maand van inwerkingtreding van de dienstverleningsovereenkomst of
              de voorlaatste decembermaand voor de . Indien de uitvoerder een
              student betreft die zijn wettelijk contingent van 600 uren op
              jaarbasis overschrijdt zal het honorarium verhoogd worden naar{" "}
              {props.data.pricing.hourlyPayWorkStudent
                ? props.data.pricing.hourlyPayWorkStudent
                : 35.5}
              EUR per uur (ex. BTW) voor de uren die het contingent
              overschrijden in dat jaar. Deze vermeerdering is van toepassing
              doordat de student vanaf uur 601 onderhevig is aan de normale
              wettelijke verplichtingen van een bediende. Vanaf de student over
              minder dan 100 uur beschikt wordt de klant direct op de hoogte
              gebracht.
            </p>
            <p>
              De prijzen en afspraken die we in dit voorstel opnamen voor de
              vermelde profielen, gelden voor één jaar vanaf ondertekening van
              de dienstverleningsovereenkomst.
            </p>
          </div>
          <div className="contract-content-part" id="part-9">
            <h3>9. Wijzigingen opdracht – meerwerk </h3>
            <p>
              Indien er wijzigingen aangebracht worden aan de omschreven
              opdracht, die resulteren in meerwerk, zal dit meerwerk
              doorgerekend worden mits partijen een schriftelijk akkoord
              hierover hebben gesloten. In geval van meerwerk zal dit tegen de
              volgende toeslagfactoren worden gefactureerd :
            </p>
            <ul>
              <li>
                Overschrijding 9 u/dag of 40 u/week: (halve) dagtarief x 150% ;
                behalve wanneer overuren gepresteerd worden op zondag, dan geldt
                (halve) dagtarief x 200%
              </li>
              <li>Presaties op feestdagen: (halve) dagtarief x 200% </li>
            </ul>
            <p>
              Met betrekking tot zaterdag-, zondag- en feestdagenprestaties
              wordt er geen toeslagfactor aangerekend indien het om remote en
              flexibel werk draait waarbij de dienstverlener vrij zijn
              werkagenda mag indelen. De toeslagfactor is enkel van toepassing
              wanneer dit een verplichting is van de opdrachtgever om op die
              specifieke dag te werken.
            </p>
          </div>
          <div className="contract-content-part" id="part-10">
            <h3>10. Facturatie en betaling</h3>
            <p>
              De door de Dienstverlener uitgevoerde werkzaamheden en
              gepresteerde uren zullen op prestatiestaten bijgehouden worden.
              Deze prestatiestaten dienen als basis voor de wekelijkse
              facturatie. De facturen zijn 8 dagen na factuurdatum betaalbaar.
            </p>
            <p>
              De selectiefee wordt in twee schijven gefactureerd: 50% van de
              selectiefee wordt gefactureerd op het moment van
              contractondertekening tussen kandidaat en werkgever. De andere 50%
              wordt gefactureerd op het ogenblik van effectieve opstart van de
              samenwerking tussen klant en young graduate/professional. Facturen
              voor selectiefees zijn 31 dagen na factuurdatum betaalbaar.
            </p>
            <p>
              Alle klachten betreffende de facturatie dienen binnen de 8 dagen
              na ontvangst van de factuur per aangetekend schrijven ingediend
              worden of via mailverkeer via het mailadres:
              <a href="mailto:finance@octosales.be">finance@octosales.be</a> .
            </p>
            <p>
              Bij ontstentenis van betaling binnen de overeengekomen termijn,
              zullen vanaf de vervaldag op het onbetaald bedrag van de betrokken
              factuur van rechtswege en zonder voorafgaande ingebrekestelling
              nalatigheidsinteresten verschuldigd zijn gelijk aan de rente
              bepaald in de Wet van 2 augustus 2002 (gewijzigd bij Wet van 22
              november 2013) betreffende de bestrijding van de
              betalingsachterstand bij handelstransacties. Eveneens is de
              opdrachtgever bij niet-betaling van het factuur op de vervaldag,
              van rechtswege en zonder voorafgaande ingebrekestelling, ten titel
              van schadebeding een forfaitaire schadevergoeding verschuldigd van
              10% van het op de vervaldag onbetaalde factuurbedrag, met een
              minimum van 150 EUR en 8,5% verwijlinteresten op jaarbasis vanaf
              de vervaldag, onverminderd het recht van de Dienstverlener een
              hogere schadevergoeding te vorderen mits bewijs van grotere
              werkelijk geleden schade. Bovendien behoudt de Dienstverlener zich
              het recht voor om bij niet-betaling van het factuurbedrag of in
              geval van laattijdige betaling een vergoeding te vorderen voor de
              gerechtelijke invorderingskosten, dit conform het recht op de
              gerechtskosten en het recht op de bijdrage in de erelonen en
              onkosten van advocaten.
            </p>
          </div>
          <div className="contract-content-part" id="part-11">
            <h3>11. Vervanging Uitvoerder van de Dienstverlener </h3>
            <p>
              <strong>11.1</strong> De Dienstverlener verbindt zich ertoe enige
              vervanging van een uitvoerder door een andere uitvoerder op
              voorhand mee te delen aan de opdrachtgever, rekening houdend met
              de bekommernissen van de opdrachtgever. Een uitvoerder dient
              steeds vervangen te worden door een uitvoerder met tenminste
              gelijkwaardige kwalificaties, ervaring en expertise. De
              uitvoerder/Dienstverlener staat in voor de opleiding en
              kennisoverdracht, indien nodig, en de kosten hiervan, bij een
              dergelijke vervanging. Dit zal enkel plaatsvinden bij goedkeuring
              van beide partijen.
            </p>
            <p>
              <strong>11.2</strong> Indien de opdrachtgever vaststelt dat de
              uitvoering van de opdracht door een Dienstverlener van de
              Dienstverlener niet voldoet aan de specificaties, dan stelt de
              opdrachtgever de Dienstverlener hiervan in kennis binnen de
              <strong>drie werkdagen</strong>, samen met de gemotiveerde redenen
              van zijn klacht. De Dienstverlener zal, na overleg, de betrokken
              Dienstverlener kosteloos vervangen door een andere Dienstverlener
              met gelijkwaardige kwalificaties en expertise.
            </p>
          </div>

          <div className="contract-content-part" id="part-12">
            <h3>12. Volledige overeenkomst</h3>
            <p>
              <strong>12.1</strong> Deze overeenkomst bevat het integraal
              akkoord tussen de partijen en vervangt en annuleert alle vroegere
              mondelinge of schriftelijke overeenkomsten, offertes,
              correspondentie of voorstellen met betrekking tot het voorwerp van
              deze overeenkomst.
            </p>
            <p>
              <strong>12.2</strong> Eventuele aanvullingen of wijzigingen aan
              deze overeenkomst zijn slechts geldig indien deze door de partijen
              schriftelijk overeengekomen worden.
            </p>
            <p>
              <strong>12.3</strong> Elke brief, aangetekende brief of
              notificatie zal geschieden op het adres van de partijen vermeld in
              het begin van onderhavige overeenkomst. Indien het adres wijzigt,
              zullen partijen elkaar onmiddellijk van deze adreswijziging op de
              hoogte brengen.
            </p>
            <p>
              <strong>12.4</strong> Nietigheid van een beding van deze
              overeenkomst, heeft nooit tot gevolg dat de gehele overeenkomst
              nietig is. Indien een beding toch nietig verklaard zou worden door
              een gerechtelijke instantie, komen partijen overeen dit beding
              zodanig aan te passen dat het niet meer behept is met een
              nietigheid.
            </p>
          </div>
          <div className="contract-content-part" id="part-13">
            <h3>13. Geschillen</h3>
            <p>
              Deze overeenkomst valt onder de toepassing van de Belgische
              regelgeving. Elk geschil omtrent de bepalingen van deze
              overeenkomst zal beslecht worden voor de bevoegde Belgische
              rechtbanken waar de maatschappelijke zetel van de Dienstverlener
              is gelegen.{" "}
            </p>
          </div>
          <div className="contract-content-part" id="end">
            <p>
              Gedaan te {props.data.place} op {props.data.date} in 2 originele
              exemplaren waarvan elke partij erkent een ondertekend exemplaar te
              hebben ontvangen.
            </p>
            <div className="end-signatures">
              <div>
                <p>Voor de Dienstverlener</p>
                <img
                  src={HtArthur}
                  alt="Charles-Arthur's signature"
                  className="signature"
                />
                <p>
                  Charles-Arthur Notterbaert
                  <br />
                  Zaakvoerder
                  <br />
                  OctoSales - Nottebaert Consult BV
                </p>
              </div>

              <div>
                <p>Voor de Opdrachtgever</p>
                <div className="client-signature">
                  <img src="(HANDTEKENING)" alt="Client's signature" />
                </div>
                <div>
                  <p>
                    {props.data.representativeName}
                    <br />
                    {props.data.representativeFunction}
                    <br />
                    {props.data.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lines">
            <div className="top-line--yellow"></div>
            <div className="top-line--black" id="bottom-line--black"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContactForm;
