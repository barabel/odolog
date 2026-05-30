import cx from 'classix';

export const MainPage: FCClass = ({
  className,
}) => {
  return (
    <div
      className={cx(
        'mt-300 ml-300 t1',
        className,
      )}
    >
      MainPage
    </div>
  );
};
