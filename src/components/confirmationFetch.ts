export function confirmationFetch(_: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("färdig");
    }, 2000);
  });
}
