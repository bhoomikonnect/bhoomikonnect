-- Original BhoomiKonnect demo seed. Replace demo contact values before launch.
insert into public.service_categories (family, name, slug, description, display_order)
values
  ('construction', 'Construction', 'construction', 'House and commercial construction services.', 1),
  ('architecture', 'Architecture', 'architecture', 'Planning, drawings, design, and approvals.', 2),
  ('interiors', 'Interiors', 'interiors', 'Home and commercial interior design.', 3),
  ('painting', 'Painting', 'painting', 'Interior, exterior, and specialist coatings.', 4),
  ('renovation', 'Renovation', 'renovation', 'Remodeling, repair, and upgrade work.', 5),
  ('maintenance', 'Maintenance', 'maintenance', 'Everyday home repair and maintenance.', 6)
on conflict (slug) do nothing;

insert into public.services (family, title, slug, summary, starting_price, price_label, timeline, features, deliverables, service_locations, is_featured)
values
  ('construction', 'House Construction', 'house-construction', 'Scope-led house construction with milestone coordination.', 2100, 'per sq.ft indicative', '6-12 months', '["Verified team","Stage checks","Transparent scope"]', '["Requirement review","Quotation","Work plan","Handover"]', array['Hyderabad','Vijayawada','Guntur'], true),
  ('architecture', 'House Plans', 'house-plans', 'Practical plans aligned with site, brief, and approvals.', 15000, 'starting estimate', '2-4 weeks', '["Site-aware planning","Revision workflow"]', '["Brief","Concept","Working plan"]', array['Hyderabad','Vijayawada','Guntur'], true),
  ('interiors', 'Modular Kitchen', 'modular-kitchen', 'Material-led modular kitchen design and installation.', 180000, 'starting estimate', '5-8 weeks', '["Material choices","Factory finish"]', '["Measure","Design","Production","Install"]', array['Hyderabad','Vijayawada'], true),
  ('maintenance', 'Plumbing', 'plumbing', 'Verified plumbing inspection and repair.', 499, 'per visit', 'Same day to 3 days', '["Verified professional","Scope-first estimate"]', '["Inspection","Estimate","Repair"]', array['Hyderabad','Vijayawada','Guntur'], true)
on conflict (slug) do nothing;

insert into public.material_categories (name, slug, description, display_order)
values ('Cement', 'cement', 'Cement supply quotations.', 1), ('Steel', 'steel', 'Reinforcement steel quotations.', 2), ('Tiles', 'tiles', 'Floor and wall tile quotations.', 3)
on conflict (slug) do nothing;

insert into public.testimonials (name, role, quote, rating, is_featured, display_order)
values ('Riya Menon', 'Property buyer', 'Approval details and direct conversations made our shortlist much easier.', 5, true, 1),
       ('Sai Kiran', 'Construction customer', 'The quotation separated materials and work stages clearly before we committed.', 5, true, 2);
