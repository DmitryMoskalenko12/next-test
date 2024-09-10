import { getTrainings } from '@/lib/training';
import { verifyAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function TrainingPage() {
  const trainingSessions = getTrainings();
  
  const result = await verifyAuth();

  if (!result.user) {
    return redirect('/')
  }
  
  return (
    <main>
      <h1>Find your favorite activity</h1>
      <ul id="training-sessions">
        {trainingSessions.map((training) => (
          <li key={training.id}>
            <img src={`/trainings/${training.image}`} alt={training.title} />
            <div>
              <h2>{training.title}</h2>
              <p>{training.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
