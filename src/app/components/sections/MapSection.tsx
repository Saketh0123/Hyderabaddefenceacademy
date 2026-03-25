export function MapSection() {
  return (
    <section className="w-full">
      <div className="h-[450px] w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.5839!2d78.710278!3d17.555639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDMzJzIwLjMiTiA3OMKwNDInMzcuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Hyderabad Defence Academy Location"
        />
      </div>
    </section>
  );
}
