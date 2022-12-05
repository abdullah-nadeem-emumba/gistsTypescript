export const formatFileContent = (content: string | JSON) => {
  if (typeof content === "string") return content.split(/\r?\n/);
  return JSON.stringify(content, null, 2).split(/\r?\n/);
};

export const getUserFromStorage = () => {
  const isUser = localStorage.getItem("user");
  return isUser ? JSON.parse(isUser) : null;
};

export const returnFiles = (filesArr: any) => {
  let files = {};
  filesArr.forEach((item: any) => {
    files[item.filename] = {
      content: item.content,
    };
  });
  return files;
};
