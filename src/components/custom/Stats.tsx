const statsList = [
  {
    amount: '73K+',
    content: 'Students',
  },
  {
    amount: '500+',
    content: 'Expert instructors',
  },
  {
    amount: '1,200+',
    content: 'Courses',
  },
  {
    amount: '4.8/5',
    content: 'Rating',
  },
];

export default function Stats() {
  return (
    <section className='grid grid-cols-2 md:grid-cols-4 text-center py-10 bg-gray-100'>
      {statsList.map((list) => (
        <div key={list.content} className='flex flex-col gap-2'>
          <h2 className='text-4xl font-bold text-primary'>{list.amount}</h2>
          <p className='text-sm'>{list.content}</p>
        </div>
      ))}
    </section>
  );
}
