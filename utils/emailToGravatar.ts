import md5 from 'md5';

const emailToGravatar = (email: string | undefined) => {
  if (!email) return '';
  const hash = md5(email?.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}`;
};

export default emailToGravatar;
