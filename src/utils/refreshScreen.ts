// Reload session by replicating a different tab click
const refreshScreen = () => {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
};

export { refreshScreen };
