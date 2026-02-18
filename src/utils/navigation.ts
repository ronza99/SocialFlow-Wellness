export const scrollToPricingSection = (currentPath: string, navigate: (path: string) => void) => {
  if (currentPath !== '/') {
    navigate('/#pricing');
    setTimeout(() => {
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  } else {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

export const scrollToMaintenancePlans = (currentPath: string, navigate: (path: string) => void) => {
  const scrollToSection = () => {
    const section = document.getElementById('piani-manutenzione');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentPath !== '/') {
    navigate('/');
    setTimeout(scrollToSection, 300);
  } else {
    scrollToSection();
  }
};
