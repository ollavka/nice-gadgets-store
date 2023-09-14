export const normalizeImage = (imagePath: string) => {
  const projectName = process.env.PUBLIC_URL;

  if (imagePath.includes(projectName)) {
    return imagePath;
  }

  return `${projectName}/${imagePath}`;
};
