export default {
  '**/*.{js,jsx,ts,tsx,json,css,md}': stagedFiles => [
    `eslint .`,
    `prettier --write ${stagedFiles.join(' ')}`,
  ],
};
