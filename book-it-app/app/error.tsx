"use client"; // Error components must be Client Components
// @path: @/app/error.tsx

// відображає повідомлення про помилку та пропонує спробу повторити дію
export default function Error({ error, reset }: {
  error: Error;
  reset?: () => void;
}) {
  return (
    <div>
      {/* контейнер для централізованого відображення вмісту */}
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          {/* заголовок з текстом помилки */}
          <h2 className="display-4 fw-bold">{error?.message}</h2>
          <p className="fs-3">
            <span className="text-danger">Opps!</span> Something went wrong!
          </p>
          <p className="lead">Sorry for inconvience</p>
          {/* кнопка для спроби повторити дію */}
          <button className="btn btn-primary" onClick={() => reset?.()}>
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
