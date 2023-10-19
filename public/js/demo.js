function requestDemo() {
    const subject = encodeURIComponent("Demo Request");
    const body = encodeURIComponent("Hello, I am [Name], I would like to request a demo of the product. The best way to contact me is [include contact information]");
    const mailtoLink = `mailto:bkeeper4914@outlook.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  }   