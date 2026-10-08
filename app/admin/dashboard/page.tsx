import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { validToken } from '@/lib/auth';
import { db } from '@/lib/db';
import { AdminConsole } from '@/components/AdminConsole';
export const dynamic='force-dynamic';
export default async function Dashboard(){
  if(!validToken((await cookies()).get('shahul_admin')?.value)) redirect('/admin/login');
  const [projects,blogs,messages,quotes,experience,skills,certs,services,innovations]=await Promise.all([
    db.project.count(),db.blogPost.count(),db.contactMessage.count({where:{status:'NEW'}}),db.quoteRequest.count({where:{status:'NEW'}}),db.experience.count(),db.skill.count(),db.certification.count(),db.service.count(),db.innovationItem.count()
  ]);
  return <AdminConsole stats={{projects,blogs,messages,quotes,experience,skills,certs,services,innovations}}/>;
}
