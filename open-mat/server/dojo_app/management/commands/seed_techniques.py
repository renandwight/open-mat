from django.core.management.base import BaseCommand
from dojo_app.models import Technique

class Command(BaseCommand):
    help = 'Seed database with BJJ techniques'
    
    def handle(self, *args, **kwargs):
        techniques = [
            # SUBMISSIONS
            {
                'name': 'Rear Naked Choke',
                'category': 'submissions',
                'difficulty': 'beginner',
                'position': 'back_control',
                'youtube_url': 'https://youtube.com/shorts/oYDe-hrazL8?si=CfLjjzj42Ksh-0zl',
                'description': 'Classic blood choke from back control. Slide arm under chin, grip bicep, apply pressure with head.'
            },
            {
                'name': 'Armbar from Guard',
                'category': 'submissions',
                'difficulty': 'beginner',
                'position': 'closed_guard',
                'youtube_url': 'https://youtube.com/shorts/ug5Knk1HlsY?si=Jm471q5X903sO10S',
                'description': 'Control opponent\'s arm, pivot hips, break posture, extend arm over hips for submission.'
            },
            {
                'name': 'Triangle Choke from Guard',
                'category': 'submissions',
                'difficulty': 'intermediate',
                'position': 'guard',
                'youtube_url': 'https://youtube.com/shorts/RVUL6KNBNG0?si=mG0FPWXdlbX6Wlwh',
                'description': 'Trap head and arm with legs, lock triangle, squeeze knees, pull head down for finish.'
            },
            {
                'name': 'Kimura from Side Control',
                'category': 'submissions',
                'difficulty': 'intermediate',
                'position': 'side_control',
                'youtube_url': 'https://youtube.com/shorts/astb6aVjcu4?si=UDRmVXLbWVAPcsjQ',
                'description': 'Figure-four grip on opponent\'s arm, isolate shoulder, rotate for shoulder lock.'
            },
            {
                'name': 'Guillotine Choke',
                'category': 'submissions',
                'difficulty': 'beginner',
                'position': 'standing',
                'youtube_url': 'https://youtube.com/shorts/bLBHnMUjoug?si=koEKRvv8wZONXUTL',
                'description': 'Wrap arm around neck, clasp hands, pull up while pulling opponent down.'
            },
            
            # ESCAPES
            {
                'name': 'Hip Escape (Shrimp)',
                'category': 'escapes',
                'difficulty': 'beginner',
                'position': 'side_control',
                'youtube_url': 'https://youtube.com/shorts/D5dWbjd-6P8?si=ASg8pqh5RaZcr5HS',
                'description': 'Bridge to create space, turn to side, slide hips away, insert knee to recover guard.'
            },
            {
                'name': 'Elbow Escape from Mount',
                'category': 'escapes',
                'difficulty': 'beginner',
                'position': 'mount',
                'youtube_url': 'https://www.youtube.com/watch?v=Fcs0H_eOyko',
                'description': 'Trap arm and leg on same side, bridge and roll, or shrimp to recover half guard.'
            },
            {
                'name': 'Back Escape',
                'category': 'escapes',
                'difficulty': 'intermediate',
                'position': 'back_control',
                'youtube_url': 'https://youtube.com/shorts/UXP4W5LLFro?si=8rBHYw24cGaFYHq7',
                'description': 'Protect neck, create distance, turn into opponent, recover guard position.'
            },
            {
                'name': 'Standing Escape from Closed Guard',
                'category': 'escapes',
                'difficulty': 'beginner',
                'position': 'closed_guard',
                'youtube_url': 'https://youtube.com/shorts/HHj-LAqZePA?si=wHNfWxqqR0aG4iN8',
                'description': 'Posture up, stand while maintaining base, break guard grip, step back.'
            },
            
            # SWEEPS
            {
                'name': 'Scissor Sweep',
                'category': 'sweeps',
                'difficulty': 'beginner',
                'position': 'guard',
                'youtube_url': 'https://youtube.com/shorts/CGJ2pa0xdfM?si=c_V5iFk3ip9rKAnE',
                'description': 'Control sleeve and collar, shin across body, scissor legs while pulling to sweep.'
            },
            {
                'name': 'Flower Sweep',
                'category': 'sweeps',
                'difficulty': 'intermediate',
                'position': 'closed_guard',
                'youtube_url': 'https://youtube.com/shorts/kFsuOBvwssI?si=nfS85o-vsMyQ0eGn',
                'description': 'Overhook arm, underhook leg, bridge and roll to sweep opponent over.'
            },
            {
                'name': 'Butterfly Sweep',
                'category': 'sweeps',
                'difficulty': 'intermediate',
                'position': 'guard',
                'youtube_url': 'https://youtube.com/shorts/sn6gOPntPLc?si=uREb3Z1Pr28ChuqS',
                'description': 'Hook legs inside, control grips, elevate with hook while pulling to sweep.'
            },
            {
                'name': 'X-Guard Sweep',
                'category': 'sweeps',
                'difficulty': 'advanced',
                'position': 'guard',
                'youtube_url': 'https://youtube.com/shorts/uWzf5Nezuh0?si=5NYKpiNTAEym_23s',
                'description': 'Control one leg with both of yours in X formation, off-balance and sweep.'
            },
            
            # GUARD PASSES
            {
                'name': 'Toreando Pass',
                'category': 'passes',
                'difficulty': 'intermediate',
                'position': 'standing',
                'youtube_url': 'https://youtube.com/shorts/WEYJ4CwwHHU?si=ZcPn-hdA6TzqoPiy',
                'description': 'Control both legs, bullfighter motion to side, establish side control.'
            },
            {
                'name': 'Knee Slice Pass',
                'category': 'passes',
                'difficulty': 'intermediate',
                'position': 'half_guard',
                'youtube_url': 'https://youtube.com/shorts/ASVVD42u1FU?si=nF2U6YI_p84bCwVG',
                'description': 'Drive knee across opponent\'s legs, maintain chest pressure, slide to side control.'
            },
            {
                'name': 'Stack Pass',
                'category': 'passes',
                'difficulty': 'beginner',
                'position': 'closed_guard',
                'youtube_url': 'https://youtube.com/shorts/zhrq3EZHPr0?si=VtrE8l405shJVP7d',
                'description': 'Control legs, stack opponent\'s hips over shoulders, circle to side.'
            },
            {
                'name': 'Leg Drag Pass',
                'category': 'passes',
                'difficulty': 'intermediate',
                'position': 'open_guard',
                'youtube_url': 'https://youtube.com/shorts/gsu--H3V-q4?si=YcS616i0F86i_vrY',
                'description': 'Control leg, drag across body, establish side control or back take.'
            },
            
            # TAKEDOWNS
            {
                'name': 'Double Leg Takedown',
                'category': 'takedowns',
                'difficulty': 'beginner',
                'position': 'standing',
                'youtube_url': 'https://youtube.com/shorts/qDD40BckF20?si=wfNh-ATr7OCGRVNN',
                'description': 'Change levels, penetrate step, grab both legs, drive through for takedown.'
            },
            {
                'name': 'Single Leg Takedown',
                'category': 'takedowns',
                'difficulty': 'beginner',
                'position': 'standing',
                'youtube_url': 'https://youtube.com/shorts/2u0ZKAbxp6w?si=SXZLWHDHns-vpDPA',
                'description': 'Grab one leg, drive into opponent, finish with trip or lift.'
            },
            {
                'name': 'Osoto Gari (Major Outer Reap)',
                'category': 'takedowns',
                'difficulty': 'intermediate',
                'position': 'standing',
                'youtube_url': 'https://youtube.com/shorts/IWI_hHnqLVM?si=EZt8keTFINOQD5cd',
                'description': 'Control upper body, reap opponent\'s leg from outside, drive back for throw.'
            },
            {
                'name': 'Ankle Pick',
                'category': 'takedowns',
                'difficulty': 'intermediate',
                'position': 'standing',
                'youtube_url': 'https://youtube.com/shorts/hDuSjpsgtV8?si=oKmfBZctz3E1r-nz',
                'description': 'Create reaction, change levels, grab ankle, drive forward for takedown.'
            },
            
            # POSITIONS
            {
                'name': 'Mount Control and Maintenance',
                'category': 'positions',
                'difficulty': 'beginner',
                'position': 'mount',
                'youtube_url': 'https://youtube.com/shorts/zQbkvb_hkwY?si=bbliuMZv3sZolyHG',
                'description': 'Establish mount, control hips, maintain balance, counter escape attempts.'
            },
            {
                'name': 'Back Control and Hooks',
                'category': 'positions',
                'difficulty': 'intermediate',
                'position': 'back_control',
                'youtube_url': 'https://youtube.com/shorts/xbIxNDgQA_U?si=hYaZbeBH-T6WC6B-',
                'description': 'Insert hooks, control upper body, maintain position while opponent escapes.'
            },
            {
                'name': 'Closed Guard Fundamentals',
                'category': 'positions',
                'difficulty': 'beginner',
                'position': 'closed_guard',
                'youtube_url': 'https://youtube.com/shorts/TEOilhNFAok?si=PfzO_dlC3yR60Q46',
                'description': 'Control posture, break down opponent, maintain closed guard, set up attacks.'
            },
            {
                'name': 'Side Control Maintenance',
                'category': 'positions',
                'difficulty': 'beginner',
                'position': 'side_control',
                'youtube_url': 'https://youtube.com/shorts/ERRNHRLZ5e4?si=EoPVdd7Uz_okDAAs',
                'description': 'Establish side control, distribute weight, control hips and shoulders.'
            },
            {
                'name': 'Half Guard Retention',
                'category': 'positions',
                'difficulty': 'intermediate',
                'position': 'half_guard',
                'youtube_url': 'https://youtube.com/shorts/d4S6twtlXzs?si=xUMQ8Aw9PyriQbU1',
                'description': 'Maintain half guard, prevent pass, create angles for sweeps.'
            },
            {
                'name': 'Spider Guard Setup',
                'category': 'positions',
                'difficulty': 'intermediate',
                'position': 'open_guard',
                'youtube_url': 'https://youtube.com/shorts/DM6-SKHGcJY?si=5IuYeCpU469CBb1I',
                'description': 'Control sleeves with feet, maintain distance, set up sweeps and submissions.'
            },
            {
                'name': 'De La Riva Guard',
                'category': 'positions',
                'difficulty': 'advanced',
                'position': 'open_guard',
                'youtube_url': 'https://youtube.com/shorts/oP5zrILMPDs?si=TylElQDL8u034uDC',
                'description': 'Hook leg, control grips, off-balance opponent, transition to sweeps.'
            },
        ]
        
        for tech_data in techniques:
            technique, created = Technique.objects.get_or_create(
                name=tech_data['name'],
                defaults=tech_data
            )
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'✅ Created: {technique.name}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'⚠️  Already exists: {technique.name}')
                )
        
        total = Technique.objects.count()
        self.stdout.write(
            self.style.SUCCESS(f'\n🎉 Seeding complete! Total techniques: {total}')
        )