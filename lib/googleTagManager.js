export const GTM_CONTAINER_ID = 'GTM-PN9N3JQ';

export const GTM_HEAD_SCRIPT = `
  (function(w,d,s,l,i){
    w[l]=w[l]||[];
    w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
    const f=d.getElementsByTagName(s)[0];
    const j=d.createElement(s);
    const dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;
    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
`;

export const GTM_NO_SCRIPT = `
  <iframe
    src="https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}"
    height="0"
    width="0"
    style="display:none;visibility:hidden"
  ></iframe>
`;

export const pushToDataLayer = (eventName, payload = {}) => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...payload,
  });
};
