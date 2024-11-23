// AboutUs.js
import React from "react";

const AboutUsPage = () => {
  return (
    <section className="py-12 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2
          className="text-4xl font-extrabold mb-6"
          style={{ color: "#ffff00" }}
        >
          About AgriGuard Solutions
        </h2>
        <p className="text-xl font-semibold leading-relaxed mb-4">
          At <strong style={{ color: "#ffff00" }}>AgriGuard Solutions</strong>,
          we are committed to revolutionizing the way agricultural products are
          managed. Our innovative tools empower farmers, suppliers, and
          distributors to streamline processes, enhance productivity, and ensure
          sustainable growth. From tracking inventory to optimizing logistics,
          AgriGuard Solutions is your trusted partner in agriculture.
        </p>
        <p className="text-xl font-semibold leading-relaxed">
          With a vision for a greener future, we integrate cutting-edge
          technology with deep agricultural expertise to create solutions that
          not only improve efficiency but also contribute to a thriving
          ecosystem. Together, we can cultivate a brighter tomorrow.
        </p>
      </div>
    </section>
  );
};

export default AboutUsPage;
