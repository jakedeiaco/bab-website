from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.enums import TA_LEFT, TA_CENTER

RED = colors.HexColor('#C0392B')
WHITE = colors.HexColor('#FFFFFF')
DARK = colors.HexColor('#111111')
GRAY = colors.HexColor('#888888')
LIGHT = colors.HexColor('#DDDDDD')

output_path = '/Users/openclaw/.openclaw/workspace/projects/bab-shot-list/BAB-Photo-Shot-List.pdf'

doc = SimpleDocTemplate(
    output_path,
    pagesize=letter,
    rightMargin=0.75*inch,
    leftMargin=0.75*inch,
    topMargin=0.75*inch,
    bottomMargin=0.75*inch
)

styles = getSampleStyleSheet()

title_style = ParagraphStyle('Title', fontName='Helvetica-Bold', fontSize=22, textColor=RED, alignment=TA_CENTER, spaceAfter=2)
subtitle_style = ParagraphStyle('Subtitle', fontName='Helvetica', fontSize=10, textColor=GRAY, alignment=TA_CENTER, spaceAfter=16)
section_style = ParagraphStyle('Section', fontName='Helvetica-Bold', fontSize=12, textColor=RED, spaceBefore=14, spaceAfter=4)
item_style = ParagraphStyle('Item', fontName='Helvetica', fontSize=10, textColor=DARK, leftIndent=12, spaceAfter=3, leading=14)
note_style = ParagraphStyle('Note', fontName='Helvetica-Oblique', fontSize=9, textColor=GRAY, leftIndent=12, spaceAfter=3, leading=13)

def bullet(text):
    return Paragraph(f'• {text}', item_style)

def note(text):
    return Paragraph(f'  {text}', note_style)

def section(text):
    return Paragraph(text, section_style)

story = []

story.append(Paragraph('BAY AREA BOXING', title_style))
story.append(Paragraph('Photo Shot List — Thursday Shoot', subtitle_style))
story.append(HRFlowable(width='100%', thickness=1, color=RED, spaceAfter=12))

# Hero
story.append(section('HERO SHOTS (priority)'))
story.append(bullet('Wide establishing shot of the main floor — ring, bags, people training in background'))
story.append(bullet('One killer action shot: mitt work or sparring, motion blur on the punch, sharp on the face'))
story.append(bullet('Fighter silhouette against gym lighting — moody, dark background'))

# Boxing
story.append(section('BOXING'))
story.append(bullet('Mitt work: coach holding pads, fighter throwing combo'))
story.append(bullet('Heavy bag work: full extension punch, sweat flying if possible'))
story.append(bullet('Wrapping hands close-up (good texture shot)'))
story.append(bullet('Ring work: two people sparring or drilling'))

# Muay Thai
story.append(section('MUAY THAI'))
story.append(bullet('Roundhouse kick on the bag — full extension'))
story.append(bullet('Clinch/knee work with pads'))
story.append(bullet('Low kick or teep in action'))

# BJJ
story.append(section('BRAZILIAN JIU-JITSU'))
story.append(bullet('Ground work: guard pass or submission attempt'))
story.append(bullet('Drilling on the mat — two people focused'))
story.append(bullet('Close-up of grips/hands on gi or rash guard'))

# Strength
story.append(section('STRENGTH & FITNESS'))
story.append(bullet('Barbell rack in use — squat or deadlift'))
story.append(bullet('Assault bike or rower — athlete pushing hard'))
story.append(bullet('Kettlebell or dumbbell work'))
story.append(bullet('Wide shot of the weight room with people in it'))

# Environmental
story.append(section('GYM SPACE / ENVIRONMENTAL'))
story.append(bullet('Empty ring from ringside angle'))
story.append(bullet('Bag line with light coming through'))
story.append(bullet('Weight room overview (clean, no people)'))
story.append(bullet('Entrance or front door exterior'))

# People
story.append(section('PEOPLE / COMMUNITY'))
story.append(bullet('Instructor coaching one-on-one (candid)'))
story.append(bullet('Post-class group moment — fist bumps, laughing'))
story.append(bullet('Close-up portrait: athlete catching breath, focused expression'))

# Technical notes
story.append(Spacer(1, 10))
story.append(HRFlowable(width='100%', thickness=0.5, color=LIGHT, spaceAfter=10))
story.append(section('TECHNICAL NOTES FOR PHOTOGRAPHER'))
story.append(bullet('Dark theme website — shoot for contrast, avoid blown-out white backgrounds'))
story.append(bullet('Deliver both landscape (16:9) and portrait (4:5) crops of hero shots'))
story.append(bullet('RAW + JPEG if possible'))
story.append(bullet('Turn all gym lights on before shooting'))

story.append(Spacer(1, 20))
story.append(Paragraph('Bay Area Boxing · 210 El Camino Real, Belmont, CA 94002 · (650) 520-8681 · bayareaboxing.net', note_style))

doc.build(story)
print(f'PDF saved to {output_path}')
