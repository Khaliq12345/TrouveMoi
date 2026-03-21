export default (imgId: String) => {
  const config = useRuntimeConfig();
  return `${config.public.directusUrl}assets/${imgId}?access_token=${config.public.staticToken}`;
};
